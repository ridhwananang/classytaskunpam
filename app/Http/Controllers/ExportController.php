<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\MahasiswaExport;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function exportExcel()
    {
        $user = Auth::user();
        $fileName = 'daftar_mahasiswa_kelas_' . $user->kelas_id . '.xlsx';

        return Excel::download(new MahasiswaExport, $fileName);
    }
}
