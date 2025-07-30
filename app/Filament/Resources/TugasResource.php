<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\User;
use Filament\Tables;
use App\Models\Kelas;
use App\Models\Tugas;
use App\Models\Jadwal;
use App\Models\Category;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\ViewAction;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\TugasResource\Pages;

class TugasResource extends Resource
{
    protected static ?string $model = Tugas::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('nama_tugas')
                ->required()
                ->maxLength(255),

            Textarea::make('deskripsi')
                ->required()
                ->maxLength(500),

            DateTimePicker::make('deadline')
                ->required(),

            Select::make('kelas_id')
                ->label('Kelas')
                ->options(
                    fn() => Auth::user()->role === 'kelasAdmin'
                        ? Kelas::where('id', Auth::user()->kelas_id)->pluck('nama_kelas', 'id')
                        : Kelas::pluck('nama_kelas', 'id')
                )
                ->default(fn() => Auth::user()->kelas_id)
                ->disabled(fn() => Auth::user()->role === 'kelasAdmin')
                ->required()
                ->reactive(),

            Select::make('category_id')
                ->label('Kategori Tugas')
                ->options(Category::pluck('category', 'id'))
                ->searchable()
                ->required(),

            Select::make('jadwals_id')
                ->label('Jadwal')
                ->options(Jadwal::pluck('nama_matkul', 'id'))
                ->searchable()
                ->required(),

            Select::make('kategori')
                ->label('Jenis Tugas')
                ->options([
                    'Individu' => 'Individu',
                    'Kelompok' => 'Kelompok',
                ])
                ->required()
                ->reactive(),

            Repeater::make('kelompok')
                ->label('Kelompok')
                ->schema([
                    TextInput::make('nama_kelompok')
                        ->label('Nama Kelompok')
                        ->required(),

                    Select::make('user_ids')
                        ->label('Pilih Mahasiswa')
                        ->multiple()
                        ->searchable()
                        ->options(function () {
                            $admin = Auth::user();
                            return User::where('kelas_id', $admin->kelas_id)->pluck('name', 'id');
                        })
                        ->required(),
                ])
                ->visible(fn($get) => $get('kategori') === 'Kelompok'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_tugas')->sortable()->searchable(),
                TextColumn::make('deskripsi')->limit(50),
                TextColumn::make('deadline')->dateTime(),
                TextColumn::make('kelas.nama_kelas')->label('Kelas'),
                TextColumn::make('category.category')->label('Kategori')->sortable(),
                TextColumn::make('jadwal.nama_matkul')->label('Jadwal'),
            ])
            ->actions([
                ViewAction::make(),
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
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTugas::route('/'),
            'create' => Pages\CreateTugas::route('/create'),
            'edit' => Pages\EditTugas::route('/{record}/edit'),
            'view' => Pages\ViewTugas::route('/{record}'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery()
            ->with(['kelas', 'category', 'jadwal', 'kelompokTugas.mahasiswa']);

        if (Auth::user()->role === 'kelasAdmin') {
            $query->where('kelas_id', Auth::user()->kelas_id);
        }

        return $query;
    }
}
