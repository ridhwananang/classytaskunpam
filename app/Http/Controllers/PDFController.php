<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class PDFController extends Controller
{
    public function exportPDF()
    {
        $user = Auth::user();

        // Ambil mahasiswa yang memiliki kelas yang sama dengan user yang login
        $mahasiswa = User::where('kelas_id', $user->kelas_id)->with('kelas')->get();

        // Load view dan kirim data ke template PDF
        $pdf = Pdf::loadView('mahasiswa', compact('mahasiswa'));

        // Unduh sebagai file PDF
        return $pdf->download('daftar_mahasiswa.pdf');
    }
}
