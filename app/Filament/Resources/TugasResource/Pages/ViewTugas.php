<?php

// namespace App\Filament\Resources\TugasResource\Pages;

// use Filament\Forms;
// use App\Models\User;
// use Illuminate\Support\Facades\Log;
// use Filament\Resources\Pages\ViewRecord;
// use App\Filament\Resources\TugasResource;
// use Filament\Forms\Components\{TextInput, Textarea, Section, Repeater, Placeholder};

// class ViewTugas extends ViewRecord
// {
//     protected static string $resource = TugasResource::class;

//     protected function getFormSchema(): array
//     {
//         Log::debug('Record Data: ', ['record' => $this->record]);
//         return [
//             Section::make('Detail Tugas')->schema([
//                 TextInput::make('nama_tugas')
//                     ->label('Judul Tugas')
//                     ->disabled(),

//                 Textarea::make('deskripsi')
//                     ->label('Deskripsi')
//                     ->disabled(),

//                 TextInput::make('deadline')
//                     ->label('Deadline')
//                     ->disabled(),

//                 TextInput::make('kelas.nama_kelas')
//                     ->label('Kelas')
//                     ->disabled(),

//                 TextInput::make('category.category')
//                     ->label('Kategori')
//                     ->disabled(),

//                 TextInput::make('jadwal.nama_matkul')
//                     ->label('Jadwal')
//                     ->disabled(),
//             ]),

//             Section::make('Kelompok Tugas')
//                 ->schema([
//                     Repeater::make('kelompokTugas')
//                         ->label('Daftar Kelompok')
//                         ->schema([
//                             TextInput::make('nama_kelompok')
//                                 ->label('Nama Kelompok')
//                                 ->disabled(),

//                             Placeholder::make('anggota')
//                                 ->label('Anggota Kelompok')
//                                 ->content(
//                                     fn($record) =>
//                                     $record->kelompokTugas->map(function ($kelompok) {
//                                         return $kelompok->mahasiswa->pluck('name')->implode(', ');
//                                     })->implode(', ')
//                                 ),
//                         ])
//                         ->default(fn($record) => $record->kelompokTugas?->toArray() ?? [])
//                         ->disabled(),
//                 ])
//                 ->visible(fn($record) => $record->category?->nama === 'Kelompok'),
//         ];
//     }
// }




// =================================================================================
// namespace App\Filament\Resources\TugasResource\Pages;

// use Filament\Forms;
// use App\Models\User;
// use Filament\Resources\Pages\ViewRecord;
// use App\Filament\Resources\TugasResource;
// use Filament\Forms\Components\{TextInput, Textarea, Section, Repeater, Placeholder};

// class ViewTugas extends ViewRecord
// {
//     protected static string $resource = TugasResource::class;

//     protected function getFormSchema(): array
//     {
//         return [
//             Section::make('Detail Tugas')->schema([
//                 TextInput::make('nama_tugas')
//                     ->label('Judul Tugas')
//                     ->disabled(),

//                 Textarea::make('deskripsi')
//                     ->label('Deskripsi')
//                     ->disabled(),

//                 TextInput::make('deadline')
//                     ->label('Deadline')
//                     ->disabled(),

//                 TextInput::make('kelas.nama_kelas')
//                     ->label('Kelas')
//                     ->disabled(),

//                 TextInput::make('category.category')
//                     ->label('Kategori')
//                     ->disabled(),

//                 TextInput::make('jadwal.nama_matkul')
//                     ->label('Jadwal')
//                     ->disabled(),
//             ]),

//             Section::make('Kelompok Tugas')
//                 ->schema([
//                     Repeater::make('kelompokTugas')
//                         ->label('Daftar Kelompok')
//                         ->schema([
//                             TextInput::make('nama_kelompok')
//                                 ->label('Nama Kelompok')
//                                 ->disabled(),

//                             Placeholder::make('anggota')
//                                 ->label('Anggota Kelompok')
//                                 ->content(function ($record) {
// pastikan $record ini adalah masing-masing KelompokTugas
//             return $record->mahasiswa->pluck('name')->implode(', ');
//         }),
// ])
// ->default(fn($record) => $record->kelompokTugas ?? [])
// ->disabled(),
//  =================================================

// Repeater::make('kelompokTugas')
//     ->label('Daftar Kelompok')
//     ->relationship('kelompokTugas')
//     ->schema([
//         TextInput::make('nama_kelompok')->label('Nama Kelompok')->disabled(),

//         Placeholder::make('anggota')
//             ->label('Anggota Kelompok')
//             ->content(
//                 fn($item) =>
//                 $item->mahasiswa->pluck('name')->implode(', ') ?? 'Tidak ada anggota'
//             ),
//     ])
//     ->disabled()

// =========================================================================
//                 ])
//                 ->visible(fn($record) => $record->category?->category === 'Kelompok'),
//         ];
//     }
// }
// =================================================================================================================



// namespace App\Filament\Resources\TugasResource\Pages;

// use Filament\Forms\Components\{TextInput, Textarea, Section, View};
// use Filament\Resources\Pages\ViewRecord;
// use App\Filament\Resources\TugasResource;
// use Illuminate\Database\Eloquent\Model;

// class ViewTugas extends ViewRecord
// {
//     // Menentukan resource yang digunakan
//     protected static string $resource = TugasResource::class;

//     // Method untuk memuat data relasi kelompokTugas


//     // Mendefinisikan schema form untuk halaman ini
//     protected function getFormSchema(): array
//     {
//         return [
//             // Section pertama untuk detail tugas
//             Section::make('Detail Tugas')->schema([
//                 TextInput::make('nama_tugas')
//                     ->label('Judul Tugas')
//                     ->disabled(),  // Menampilkan hanya, tidak bisa diedit

//                 Textarea::make('deskripsi')
//                     ->label('Deskripsi')
//                     ->disabled(),  // Menampilkan hanya, tidak bisa diedit

//                 TextInput::make('deadline')
//                     ->label('Deadline')
//                     ->disabled(),  // Menampilkan hanya, tidak bisa diedit

//                 TextInput::make('kelas.nama_kelas')
//                     ->label('Kelas')
//                     ->disabled(),  // Menampilkan hanya, tidak bisa diedit

//                 TextInput::make('category.category')
//                     ->label('Kategori')
//                     ->disabled(),  // Menampilkan hanya, tidak bisa diedit

//                 TextInput::make('jadwal.nama_matkul')
//                     ->label('Jadwal')
//                     ->disabled(),  // Menampilkan hanya, tidak bisa diedit
//             ]),

//             // Section kedua untuk menampilkan informasi kelompok tugas
//             Section::make('Kelompok Tugas')
//                 ->schema([
//                     View::make('tugas-view')  // Menggunakan Blade view untuk menampilkan data kelompok
//                 ])
//                 ->visible(fn($record) => $record->category?->category === 'Kelompok'),  // Hanya tampil jika kategori adalah 'Kelompok'
//         ];
//     }
// }

namespace App\Filament\Resources\TugasResource\Pages;

use Filament\Forms;
use Illuminate\Support\Facades\Log;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\TugasResource;
use Filament\Forms\Components\{TextInput, Textarea, Section, Repeater, Placeholder};

class ViewTugas extends ViewRecord
{
    protected static string $resource = TugasResource::class;

    protected function getFormSchema(): array
    {

        return [
            Section::make('Detail Tugas')->schema([
                TextInput::make('nama_tugas')
                    ->label('Judul Tugas')
                    ->disabled()
                    ->default($this->record->nama_tugas),

                Textarea::make('deskripsi')
                    ->label('Deskripsi')
                    ->disabled()
                    ->default($this->record->deskripsi),

                TextInput::make('deadline')
                    ->label('Deadline')
                    ->disabled()
                    ->default($this->record->deadline),

                TextInput::make('kelas.nama_kelas')
                    ->label('Kelas')
                    ->disabled()
                    ->default($this->record->kelas->nama_kelas),

                TextInput::make('category.category')
                    ->label('Kategori')
                    ->disabled()
                    ->default($this->record->category->category),

                TextInput::make('jadwal.nama_matkul')
                    ->label('Jadwal')
                    ->disabled()
                    ->default($this->record->jadwal->nama_matkul),
            ]),

            Section::make('Kelompok Tugas')
                ->schema([
                    Repeater::make('kelompokTugas')
                        ->label('Daftar Kelompok')
                        ->relationship('kelompokTugas') // pastikan relasi ini benar di model
                        ->schema([
                            TextInput::make('nama_kelompok')
                                ->label('Nama Kelompok')
                                ->disabled(),

                            Placeholder::make('anggota')
                                ->label('Anggota Kelompok')
                                ->content(
                                    fn($item) => $item->mahasiswa->pluck('name')->implode(', ') ?? 'Tidak ada anggota'
                                ),
                        ])
                        ->disabled()

                ])
                ->visible(fn($record) => $record->category?->category === 'Kelompok'),
        ];
    }
}
