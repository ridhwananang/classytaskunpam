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
}
