<?php

namespace App\Filament\Resources\JadwalResource\Pages;

use Illuminate\Support\Facades\Auth;
use App\Filament\Resources\JadwalResource;
use Filament\Resources\Pages\CreateRecord;

class CreateJadwal extends CreateRecord
{
    protected static string $resource = JadwalResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (!isset($data['kelas_id'])) {
            $data['kelas_id'] = Auth::user()->kelas_id; // Set kelas_id dari user yang login
        }

        // Debugging data sebelum disimpan
        // dd($data);

        return $data;
    }
}
