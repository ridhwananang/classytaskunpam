<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Kelas;
use App\Models\Jadwal;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $kelasList = Kelas::select('id', 'nama_kelas')->get();
        $dosenList = User::where('role', 'dosen')->select('id', 'name')->get();

        if ($user->role === 'kelasAdmin') {
            $mahasiswaList = User::select('id', 'nim', 'name', 'email', 'kelas_id')
                ->where('kelas_id', $user->kelas_id)
                ->get();

            $jadwalList = Jadwal::with(['kelas', 'dosen'])
                ->where('kelas_id', $user->kelas_id)
                ->get();
        } else {
            $mahasiswaList = User::select('id', 'nim', 'name', 'email', 'kelas_id')->get();

            $jadwalList = Jadwal::with(['kelas', 'dosen'])->get();
        }

        return Inertia::render('dashboard_admin', [
            'kelasList' => $kelasList,
            'mahasiswaList' => $mahasiswaList,
            'jadwalList' => $jadwalList,
            'dosenList' => $dosenList,
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    public function storeJadwal(Request $request)
    {
        $validated = $request->validate([
            'nama_matkul' => 'required|string|max:255',
            'dosen_id' => 'required|exists:users,id',
            'ruang' => 'required|string|max:100',
            'hari' => 'required|string|max:20',
            'waktu_mulai' => 'required|date',
            'waktu_selesai' => 'required|date|after:waktu_mulai',
            'sks' => 'required|integer|min:1|max:6',
            'whatsapp' => 'required|string|max:15',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        Jadwal::create([
            'nama_matkul'   => $request->nama_matkul,
            'dosen_id'      => $request->dosen_id,
            'ruang'         => $request->ruang,
            'hari'          => $request->hari,
            'waktu_mulai'   => $request->waktu_mulai,
            'waktu_selesai' => $request->waktu_selesai,
            'sks'           => $request->sks,
            'whatsapp'      => $request->whatsapp,
            'kelas_id'      => $request->kelas_id,
        ]);


        return back()->with('success', 'Jadwal berhasil ditambahkan.');
    }
    // Masukkan dalam AdminDashboardController
    public function destroyJadwal($id)
    {
        $jadwal = Jadwal::findOrFail($id);
        $jadwal->delete();

        return back()->with('success', 'Jadwal berhasil dihapus.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return back()->with('success', 'Mahasiswa berhasil dihapus.');
    }
}
