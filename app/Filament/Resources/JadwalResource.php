<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\User;
use Filament\Tables;
use App\Models\Jadwal;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\JadwalResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\JadwalResource\RelationManagers;
use App\Models\Category;

class JadwalResource extends Resource
{
    protected static ?string $model = Jadwal::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nama_matkul')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('nama_dosen')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('ruang')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('hari')
                    ->label('Hari')
                    ->options([
                        'Senin' => 'Senin',
                        'Selasa' => 'Selasa',
                        'Rabu' => 'Rabu',
                        'Kamis' => 'Kamis',
                        'Jumat' => 'Jumat',
                        'Sabtu' => 'Sabtu',
                        'Minggu' => 'Minggu',
                    ])
                    ->required(),

                Forms\Components\TimePicker::make('waktu_mulai')
                    ->label('Waktu Mulai')
                    ->minutesStep(2)
                    ->seconds(false)
                    ->required(),

                Forms\Components\TimePicker::make('waktu_selesai')
                    ->required(),
                Forms\Components\Select::make('kelas_id')
                    ->label('Kelas')
                    ->relationship('kelas', 'nama_kelas')
                    ->required()
                    ->options(
                        fn() => Auth::user()->role === 'kelasAdmin'
                            ? \App\Models\Kelas::where('id', Auth::user()->kelas_id)->pluck('nama_kelas', 'id')
                            : \App\Models\Kelas::pluck('nama_kelas', 'id')
                    )
                    ->default(fn() => Auth::user()->kelas_id)
                    ->hidden(fn() => Auth::user()->role === 'kelasAdmin'),
                    Forms\Components\TextInput::make('sks')
    ->numeric()
    ->required()
    ->minValue(1)
    ->label('SKS'),

                    Forms\Components\TextInput::make('whatsapp')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_matkul')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('nama_dosen')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('ruang')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('hari')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('waktu_mulai')->dateTime(),
                Tables\Columns\TextColumn::make('waktu_selesai')->dateTime(),
                Tables\Columns\TextColumn::make('kelas.nama_kelas'),
                Tables\Columns\TextColumn::make('sks')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('whatsapp')->sortable()->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListJadwals::route('/'),
            'create' => Pages\CreateJadwal::route('/create'),
            'edit' => Pages\EditJadwal::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        $user = Auth::user();

        // Jika user adalah admin kelas, hanya bisa melihat jadwal kelasnya sendiri
        if ($user->role === 'kelasAdmin') {
            return $query->where('kelas_id', $user->kelas_id);
        }

        return $query;
    }
}
