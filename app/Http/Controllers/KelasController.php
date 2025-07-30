<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::all(); // Ambil data kelas

        return Inertia::render('Kelas/Index', [
            'kelasList' => $kelas
        ]);
    }

    public function show($kelasId)
    {
        $user = Auth::user();

        // Mahasiswa hanya bisa mengakses kelasnya sendiri
        if ($user->role !== 'admin' && $user->kelas_id != $kelasId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Ambil data mahasiswa berdasarkan kelas
        $mahasiswa = User::where('kelas_id', $kelasId)->get(['nim', 'name', 'kelas_id']);
        // dd($mahasiswa);
        // Kirim data ke frontend menggunakan Inertia.js
        return Inertia::render('Dashboard', [
            'mahasiswa' => $mahasiswa
        ]);
    }
}
