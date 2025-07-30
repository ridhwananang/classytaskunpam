<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Jadwal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JadwalController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $jadwals = Jadwal::where('kelas_id', $user->kelas_id)
            ->with(['kelas', 'dosen'])
            ->get()
            ->map(function ($jadwal) {
                return [
                    'id' => $jadwal->id,
                    'nama_matkul' => $jadwal->nama_matkul,
                    'dosen' => [
                        'name' => $jadwal->dosen?->name,
                    ],
                    'ruang' => $jadwal->ruang,
                    'hari' => $jadwal->hari,
                    'waktu_mulai' => \Carbon\Carbon::parse($jadwal->waktu_mulai)->format('H:i'),
                    'waktu_selesai' => \Carbon\Carbon::parse($jadwal->waktu_selesai)->format('H:i'),
                    'kelas' => [
                        'id' => $jadwal->kelas->id,
                        'nama_kelas' => $jadwal->kelas->nama_kelas,
                    ],
                    'sks' => $jadwal->sks,
                    'whatsapp' => $jadwal->whatsapp,
                ];
            });

        return Inertia::render('jadwal', [
            'jadwals' => $jadwals,
        ]);
    }
}
