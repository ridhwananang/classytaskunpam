<?php

namespace App\Filament\Resources\MahasiswaResource\Pages;

use Filament\Actions;
use Illuminate\Support\Facades\Auth;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\MahasiswaResource;

class CreateMahasiswa extends CreateRecord
{
    protected static string $resource = MahasiswaResource::class;
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (Auth::user()->role === 'kelasAdmin') {
            $data['kelas_id'] = Auth::user()->kelas_id;
        }

        return $data;
    }
}
