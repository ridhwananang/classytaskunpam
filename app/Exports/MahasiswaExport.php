<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MahasiswaExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        $user = Auth::user();

        return User::where('kelas_id', $user->kelas_id)
            ->select('name', 'nim')
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nama',
            'NIM',
        ];
    }
}
