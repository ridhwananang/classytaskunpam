<?php

namespace App\Http\Controllers;

use OTPHP\TOTP;
use Inertia\Inertia;
use App\Models\Jadwal;
use App\Models\Absensi;
use App\Models\Pertemuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsensiController extends Controller
{
    public function absensiHadir(Request $request)
    {
        $request->validate([
            'code' => 'required|digits:6',
        ]);

        $user = Auth::user();

        // Verifikasi kode OTP
        $totp = TOTP::create(decrypt($user->totp_secret));

        if (! $totp->verify($request->code)) {
            return back()->withErrors(['code' => 'Kode OTP tidak valid']);
        }

        // Cek pertemuan aktif
        $pertemuan = Pertemuan::whereHas('jadwal', function ($q) use ($user) {
            $q->where('kelas_id', $user->kelas_id);
        })->where('waktu_dibuka', '<=', now())
            ->where('waktu_ditutup', '>=', now())
            ->first();

        if (! $pertemuan) {
            return back()->withErrors(['code' => 'Tidak ada pertemuan aktif saat ini']);
        }

        // Cegah duplikat absensi
        $existing = Absensi::where('user_id', $user->id)
            ->where('pertemuan_id', $pertemuan->id)
            ->first();

        if ($existing) {
            return back()->withErrors(['code' => 'Anda sudah absen untuk pertemuan ini']);
        }

        // Simpan absensi
        Absensi::create([
            'user_id' => $user->id,
            'jadwal_id' => $pertemuan->jadwal_id,
            'pertemuan_id' => $pertemuan->id,
            'waktu' => now(),
            'status' => 'hadir',
        ]);

        return redirect()->route('absensi.riwayat')->with('success', 'Absensi berhasil dicatat!');
    }

    public function inputKode()
    {
        $user = Auth::user();

        $pertemuan = Pertemuan::whereHas('jadwal', function ($q) use ($user) {
            $q->where('kelas_id', $user->kelas_id);
        })->where('waktu_dibuka', '<=', now())
            ->where('waktu_ditutup', '>=', now())
            ->with('jadwal')
            ->first();

        return Inertia::render('absensi/InputCode', compact('pertemuan'));
    }

    public function riwayat()
    {
        $user = Auth::user();

        $absensis = Absensi::with(['pertemuan.jadwal'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('absensi/Riwayat', [
            'absensis' => $absensis,
        ]);
    }
    public function showByPertemuan($pertemuanId)
    {
        $user = Auth::user();

        $pertemuan = Pertemuan::with(['jadwal.kelas.mahasiswas', 'jadwal'])->findOrFail($pertemuanId);

        if (!($user->role === 'admin' || $pertemuan->jadwal->dosen_id == $user->id)) {
            abort(403);
        }

        $mahasiswas = $pertemuan->jadwal->kelas->mahasiswas;

        $dataKehadiran = $mahasiswas->map(function ($mhs) use ($pertemuan) {
            $status = Absensi::where('user_id', $mhs->id)
                ->where('pertemuan_id', $pertemuan->id)
                ->value('status') ?? 'tidak_hadir';

            return [
                'id' => $mhs->id,
                'name' => $mhs->name,
                'status' => $status,
            ];
        });

        return Inertia::render('kehadiran/ShowKehadiranPertemuan', [
            'matkul' => $pertemuan->jadwal->nama_matkul,
            'pertemuan' => $pertemuan->topik ?? 'Pertemuan ' . $pertemuan->pertemuan_ke,
            'pertemuanId' => $pertemuan->id, // ✅ tambahkan ini!
            'dataKehadiran' => $dataKehadiran,
        ]);
    }
    public function listPertemuan()
    {
        $user = Auth::user();

        // Ambil hanya pertemuan yang diampu dosen tersebut
        $pertemuans = Pertemuan::with('jadwal.kelas')
            ->whereHas('jadwal', function ($q) use ($user) {
                if ($user->role !== 'admin') {
                    $q->where('dosen_id', $user->id);
                }
            })
            ->latest()
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'matkul' => $p->jadwal->nama_matkul,
                'topik' => $p->topik ?? 'Pertemuan ' . $p->pertemuan_ke,
                'kelas' => $p->jadwal->kelas->nama_kelas ?? '-',
            ]);

        $matkulOptions = $pertemuans->pluck('matkul')->unique()->values();
        $kelasOptions = Jadwal::with('kelas')
            ->where('dosen_id', $user->id)
            ->get()
            ->map(function ($j) {
                return [
                    'nama_kelas' => $j->kelas->nama_kelas ?? '-',
                    'matkul' => $j->nama_matkul,
                ];
            });

        return Inertia::render('kehadiran/ListPertemuan', [
            'pertemuans' => $pertemuans,
            'matkulOptions' => $matkulOptions,
            'kelasOptions' => $kelasOptions,
        ]);
    }
    public function updateForm($mahasiswaId, Request $request)
    {
        $pertemuanId = $request->query('pertemuan_id');

        return Inertia::render('absensi/Edit', [
            'user_id' => $mahasiswaId,
            'pertemuan_id' => $pertemuanId,
        ]);
    }

    public function update($mahasiswaId, Request $request)
    {
        $request->validate([
            'pertemuan_id' => 'required|exists:pertemuans,id',
            'status' => 'required|in:hadir,tidak_hadir',
        ]);

        // Cek apakah sudah ada data absensi sebelumnya
        // cari pertemuan terlebih dahulu
        $pertemuan = Pertemuan::findOrFail($request->pertemuan_id);

        // pastikan pertemuan punya jadwal
        $jadwalId = $pertemuan->jadwal_id;

        $absensi = Absensi::firstOrNew([
            'pertemuan_id' => $request->pertemuan_id,
            'user_id' => $mahasiswaId,
        ]);

        $absensi->status = $request->status;
        $absensi->jadwal_id = $jadwalId; // ← penting!
        $absensi->save();


        return redirect()->route('kehadiran-pertemuan.show', $request->pertemuan_id)

            ->with('success', 'Absensi berhasil diperbarui.');
    }
}
