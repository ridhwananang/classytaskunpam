<?php

namespace App\Filament\Resources\TugasResource\Pages;

use Filament\Actions;
use App\Models\KelompokTugas;
use Illuminate\Support\Facades\Auth;
use App\Filament\Resources\TugasResource;
use Filament\Resources\Pages\CreateRecord;

class CreateTugas extends CreateRecord
{
    protected static string $resource = TugasResource::class;

    // Mutasi data sebelum tugas dibuat
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (Auth::user()->role === 'kelasAdmin') {
            $data['kelas_id'] = Auth::user()->kelas_id;
        }

        return $data;
    }

    // Setelah tugas dibuat, simpan kelompok tugas
    protected function afterCreate(): void
    {
        $data = $this->form->getState();

        if ($data['kategori'] === 'Kelompok' && isset($data['kelompok'])) {
            foreach ($data['kelompok'] as $kelompok) {
                // Buat kelompok tugas
                $kelompokModel = KelompokTugas::create([
                    'tugas_id' => $this->record->id,
                    'nama_kelompok' => $kelompok['nama_kelompok'],
                ]);

                // Hubungkan mahasiswa dengan kelompok tugas melalui pivot table
                $kelompokModel->mahasiswa()->attach($kelompok['user_ids']);
            }
        }
    }
}
