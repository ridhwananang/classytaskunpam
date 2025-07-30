<?php

namespace App\Filament\Resources\MahasiswaResource\Pages;

use Filament\Actions;
use Illuminate\Support\Facades\Auth;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\MahasiswaResource;

class EditMahasiswa extends EditRecord
{
    protected static string $resource = MahasiswaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (Auth::user()->role === 'kelasAdmin') {
            $data['kelas_id'] = Auth::user()->kelas_id;
        }

        return $data;
    }
}
