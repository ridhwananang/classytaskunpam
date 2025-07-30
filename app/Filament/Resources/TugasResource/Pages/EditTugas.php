<?php

namespace App\Filament\Resources\TugasResource\Pages;

use Filament\Actions;
use App\Models\KelompokTugas;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\TugasResource;

class EditTugas extends EditRecord
{
    protected static string $resource = TugasResource::class;

    // Menampilkan action delete pada header
    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    // Setelah menyimpan tugas, perbarui kelompok tugas
    protected function afterSave(): void
    {
        $data = $this->form->getState();

        if ($data['kategori'] === 'Kelompok' && isset($data['kelompok'])) {
            // Hapus kelompok tugas yang lama
            KelompokTugas::where('tugas_id', $this->record->id)->each(function ($kelompok) {
                // Hapus hubungan mahasiswa dengan kelompok tugas
                $kelompok->mahasiswa()->detach();
                // Hapus data kelompok tugas
                $kelompok->delete();
            });

            // Simpan kelompok tugas baru
            foreach ($data['kelompok'] as $kelompok) {
                $kelompokModel = KelompokTugas::create([
                    'tugas_id' => $this->record->id,
                    'nama_kelompok' => $kelompok['nama_kelompok'],
                ]);

                // Hubungkan mahasiswa dengan kelompok tugas baru
                $kelompokModel->mahasiswa()->attach($kelompok['user_ids']);
            }
        }
    }

    // Mutasi data sebelum mengisi form dengan data tugas yang sudah ada
    protected function mutateFormDataBeforeFill(array $data): array
    {
        if ($this->record->kategori === 'Kelompok') {
            $kelompokData = [];

            // Kelompokkan berdasarkan nama kelompok
            $grouped = $this->record->kelompokTugas->groupBy('nama_kelompok');

            // Mengatur data kelompok tugas untuk form
            foreach ($grouped as $namaKelompok => $anggota) {
                $kelompokData[] = [
                    'nama_kelompok' => $namaKelompok,
                    'user_ids' => $anggota->pluck('user_id')->toArray(),
                ];
            }

            $data['kelompok'] = $kelompokData;
        }

        return $data;
    }
}
