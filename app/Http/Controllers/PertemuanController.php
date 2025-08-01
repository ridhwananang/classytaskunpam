<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Jadwal;
use App\Models\Pertemuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PertemuanController extends Controller
{
    public function create()
    {
        $user = Auth::user();

        // ❗️Hanya ambil jadwal untuk dosen yang login
        $jadwals = Jadwal::with('kelas')
            ->where('dosen_id', $user->id) // ✅ hanya filter ini
            ->get(['id', 'nama_matkul']);

        return Inertia::render('pertemuan/CreatePertemuan', [
            'jadwals' => $jadwals,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jadwal_id'      => 'required|exists:jadwals,id',
            'topik'          => 'nullable|string|max:255',
            'waktu_dibuka'   => 'required|date',
            'waktu_ditutup'  => 'required|date|after:waktu_dibuka',
        ]);

        $user = Auth::user();

        // ❗️Validasi: hanya dosen pemilik jadwal yang boleh buat pertemuan
        $jadwal = Jadwal::where('id', $request->jadwal_id)
            ->where('dosen_id', $user->id)
            ->first();

        if (!$jadwal) {
            return back()->withErrors([
                'jadwal_id' => 'Jadwal tidak valid atau bukan milik Anda.',
            ]);
        }

        Pertemuan::create($request->all());

        return redirect()->route('pertemuan.create')->with('success', 'Pertemuan berhasil dibuat!');
    }


    public function show($id)
    {
        $pertemuan = Pertemuan::with(['jadwal.kelas.mahasiswas', 'absensi'])->findOrFail($id);

        $semuaMahasiswa = $pertemuan->jadwal->kelas->mahasiswas;

        $absensiMahasiswa = $pertemuan->absensi;

        // Gabungkan semua mahasiswa dengan status absensi (hadir/tidak/belum)
        $dataKehadiran = $semuaMahasiswa->map(function ($mhs) use ($absensiMahasiswa) {
            $absensi = $absensiMahasiswa->firstWhere('mahasiswa_id', $mhs->id);

            return [
                'id' => $mhs->id,
                'name' => $mhs->name,
                'status' => $absensi ? $absensi->status : 'belum', // "belum" jika belum absensi
            ];
        });

        return Inertia::render('ShowKehadiranPertemuan', [
            'matkul' => $pertemuan->jadwal->nama_matkul,
            'pertemuan' => $pertemuan->topik,
            'pertemuanId' => $pertemuan->id, // ← Tambahkan ini!
            'dataKehadiran' => $dataKehadiran,
        ]);
    }
}
