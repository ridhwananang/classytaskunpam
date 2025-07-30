<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Jadwal;
use App\Models\Absensi;
use App\Models\Pertemuan;
use App\Models\RekapNilai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RekapNilaiController extends Controller
{
    public function create(Request $request)
    {
        $user = Auth::user();

        $jadwals = Jadwal::where('dosen_id', $user->id)->with('kelas')->get();

        $kelasOptions = $jadwals->groupBy('kelas_id')->map(function ($items) {
            return [
                'id' => $items->first()->kelas->id,
                'nama_kelas' => $items->first()->kelas->nama_kelas,
            ];
        })->values();

        $matkulOptions = [];
        $mahasiswa = [];
        $kehadiran = [];
        $existing = [];
        $jadwal = null;
        $totalPertemuan = 0;

        if ($request->kelas_id) {
            $matkulOptions = $jadwals->where('kelas_id', $request->kelas_id)->map(function ($j) {
                return [
                    'id' => $j->id,
                    'nama_matkul' => $j->nama_matkul,
                ];
            })->values();
        }

        if ($request->jadwal_id) {
            $jadwal = Jadwal::findOrFail($request->jadwal_id);
            $mahasiswa = User::where('kelas_id', $jadwal->kelas_id)->get();
            $totalPertemuan = Pertemuan::where('jadwal_id', $jadwal->id)->count();

            foreach ($mahasiswa as $mhs) {
                $hadir = Absensi::where('jadwal_id', $jadwal->id)
                    ->where('user_id', $mhs->id)
                    ->where('status', 'hadir')
                    ->count();
                $kehadiran[$mhs->id] = $hadir;

                $nilai = RekapNilai::where('user_id', $mhs->id)
                    ->where('jadwal_id', $jadwal->id)
                    ->first();

                if ($nilai) {
                    $existing[$mhs->id] = [
                        'tugas' => $nilai->tugas,
                        'uts' => $nilai->uts,
                        'uas' => $nilai->uas,
                        'nilai' => $nilai->nilai,
                    ];
                }
            }
        }

        return Inertia::render('rekapnilai/InputRekapNilai', [
            'kelasOptions' => $kelasOptions,
            'matkulOptions' => $matkulOptions,
            'kelas_id' => $request->kelas_id,
            'jadwal_id' => $request->jadwal_id,
            'jadwal' => $jadwal,
            'mahasiswa' => $mahasiswa,
            'kehadiran' => $kehadiran,
            'totalPertemuan' => $totalPertemuan,
            'existing' => $existing,
        ]);
    }

    public function store(Request $request)
    {
        $jadwalId = $request->input('jadwal_id');
        $rekap = $request->input('rekap');

        $totalPertemuan = Pertemuan::where('jadwal_id', $jadwalId)->count();

        foreach ($rekap as $data) {
            $userId = $data['user_id'];
            $tugas = $data['tugas'];
            $uts = $data['uts'];
            $uas = $data['uas'];

            $rataRata = ($tugas + $uts + $uas) / 3;

            $kehadiran = Absensi::where('user_id', $userId)
                ->where('jadwal_id', $jadwalId)
                ->whereNotNull('pertemuan_id')
                ->where('status', 'hadir')
                ->count();

            $minimalKehadiran = max($totalPertemuan - 3, 0);

            if ($kehadiran < $minimalKehadiran) {
                $nilaiHuruf = 'E';
            } elseif ($rataRata >= 86) {
                $nilaiHuruf = 'A';
            } elseif ($rataRata >= 66) {
                $nilaiHuruf = 'B';
            } elseif ($rataRata >= 56) {
                $nilaiHuruf = 'C';
            } elseif ($rataRata >= 46) {
                $nilaiHuruf = 'D';
            } else {
                $nilaiHuruf = 'E';
            }

            RekapNilai::updateOrCreate(
                ['user_id' => $userId, 'jadwal_id' => $jadwalId],
                [
                    'tugas' => $tugas,
                    'uts' => $uts,
                    'uas' => $uas,
                    'kehadiran' => $kehadiran,
                    'nilai' => $nilaiHuruf,
                ]
            );
        }

        return redirect()->back()->with('success', 'Nilai berhasil disimpan');
    }

    public function nilai()
    {
        $user = Auth::user();

        $rekap = RekapNilai::with('jadwal.kelas')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($item) {
                return [
                    'matkul' => $item->jadwal->nama_matkul,
                    'kelas' => $item->jadwal->kelas->nama_kelas,
                    'tugas' => $item->tugas,
                    'uts' => $item->uts,
                    'uas' => $item->uas,
                    'kehadiran' => $item->kehadiran,
                    'nilai' => $item->nilai,
                ];
            });

        return Inertia::render('rekapnilai/Nilai', [ // ← ganti ke Nilai.tsx
            'rekap' => $rekap,
        ]);
    }
}
