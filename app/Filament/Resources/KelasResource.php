<?php

// namespace App\Filament\Resources;

// use Filament\Forms;
// use Filament\Tables;
// use App\Models\Kelas;
// use Filament\Forms\Form;
// use Filament\Tables\Table;
// use Filament\Resources\Resource;
// use Illuminate\Support\Facades\Auth;
// use Filament\Tables\Columns\TextColumn;
// use Filament\Forms\Components\TextInput;
// use Illuminate\Database\Eloquent\Builder;
// use Filament\Forms\Components\DateTimePicker;
// use App\Filament\Resources\KelasResource\Pages;
// use Illuminate\Database\Eloquent\SoftDeletingScope;
// use App\Filament\Resources\KelasResource\RelationManagers;
// use App\Filament\Resources\JadwalRelationManagerResource\RelationManagers\JadwalRelationManager;

// class KelasResource extends Resource
// {
//     protected static ?string $model = Kelas::class;

//     protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

//     protected static function shouldRegisterNavigation(): bool
// {
//     return Auth::user()->role === 'admin';
// }


//     public static function form(Form $form): Form
//     {
//         return $form
//             ->schema([
//                 TextInput::make('nama_kelas')->required(),
//                 // DateTimePicker::make('waktu_mulai')->required(),
//                 // DateTimePicker::make('waktu_selesai')->required(),
//             ]);
//     }

//     public static function table(Table $table): Table
//     {
//         return $table
//         ->query(
//             Kelas::query()->when(Auth::user()->role === 'kelasAdmin', function ($query) {
//                 return $query->whereNull('id'); // Menyembunyikan semua kelas
//             })
//         )

//             ->columns([
//                 TextColumn::make('nama_kelas')->sortable(),
//                 // TextColumn::make('waktu_mulai')->dateTime(),
//                 // TextColumn::make('waktu_selesai')->dateTime(),
//             ])
//             ->filters([
//                 //
//             ])
//             ->actions([
//                 Tables\Actions\EditAction::make()->visible(fn () => Auth::user()->role === 'admin'),
//                 Tables\Actions\DeleteAction::make()->visible(fn () => Auth::user()->role === 'admin'),
//             ])
//             ->bulkActions([
//                 Tables\Actions\BulkActionGroup::make([
//                     Tables\Actions\DeleteBulkAction::make(),
//                 ]),
//             ]);
//     }

//     public static function getRelations(): array
//     {
//         return [
//             JadwalRelationManager::class,
//         ];
//     }

//     public static function getPages(): array
//     {
//         return [
//             'index' => Pages\ListKelas::route('/'),
//             'create' => Pages\CreateKelas::route('/create')->canAccess(fn () => Auth::user()->role === 'admin'),
//             'edit' => Pages\EditKelas::route('/{record}/edit')->canAccess(fn () => Auth::user()->role === 'admin'),
//         ];
//     }
// }

// namespace App\Filament\Resources;

// use Filament\Forms;
// use App\Models\User;
// use Filament\Tables;
// use Filament\Forms\Form;
// use Filament\Tables\Table;
// use Filament\Resources\Resource;
// use Illuminate\Support\Facades\Auth;
// use App\Filament\Resources\MahasiswaResource\Pages;

// class MahasiswaResource extends Resource
// {
//     protected static ?string $model = User::class;
//     protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

// Menyembunyikan menu Mahasiswa jika role adalah kelasAdmin
//     protected static bool $shouldRegisterNavigation = false;

//     public static function form(Form $form): Form
//     {
//         return $form
//             ->schema([
//                 Forms\Components\TextInput::make('nim')
//                     ->label('NIM')
//                     ->numeric()
//                     ->required()
//                     ->unique(ignoreRecord: true),

//                 Forms\Components\TextInput::make('name')
//                     ->label('Nama')
//                     ->required()
//                     ->maxLength(255),

//                 Forms\Components\TextInput::make('email')
//                     ->label('Email')
//                     ->email()
//                     ->required()
//                     ->unique(ignoreRecord: true),

//                 Forms\Components\Select::make('kelas_id')
//                     ->label('Kelas')
//                     ->relationship('kelas', 'nama_kelas')
//                     ->required()
//                     ->disabled(fn() => Auth::user()->role === 'kelasAdmin')
//                     ->default(fn() => Auth::user()->kelas_id),

//                 Forms\Components\TextInput::make('password')
//                     ->label('Password')
//                     ->password()
//                     ->required()
//                     ->maxLength(255)
//                     ->hiddenOn('edit'),

//                 Forms\Components\Select::make('role')
//                     ->label('Role')
//                     ->options([
//                         'admin' => 'Admin',
//                         'kelasAdmin' => 'Admin Kelas',
//                         'mahasiswa' => 'Mahasiswa',
//                     ])
//                     ->required()
//                     ->disabled(fn() => Auth::user()->role === 'kelasAdmin')
//                     ->default('mahasiswa'),
//             ]);
//     }

//     public static function table(Table $table): Table
//     {
//         return $table
//             // ->query(
//             //     User::query()->when(Auth::user()->role === 'kelasAdmin', function ($query) {
//             //         return $query->where('kelas_id', Auth::user()->kelas_id);
//             //     })
//             // )
//             ->columns([
//                 Tables\Columns\TextColumn::make('nim')->sortable()->searchable(),
//                 Tables\Columns\TextColumn::make('name')->sortable()->searchable(),
//                 Tables\Columns\TextColumn::make('email')->sortable()->searchable(),
//                 Tables\Columns\TextColumn::make('kelas.nama_kelas')->sortable()->label('Kelas'),
//                 Tables\Columns\TextColumn::make('role')->sortable(),
//                 Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
//             ])
//             ->filters([
//                 Tables\Filters\SelectFilter::make('role')
//                     ->label('Filter Role')
//                     ->options([
//                         'kelasAdmin' => 'Admin Kelas',
//                         'admin' => 'Admin',
//                         'mahasiswa' => 'Mahasiswa',
//                     ]),
//             ])
//             ->actions([
//                 Tables\Actions\EditAction::make(),
//                 Tables\Actions\DeleteAction::make(),
//             ])
//             ->bulkActions([
//                 Tables\Actions\BulkActionGroup::make([
//                     Tables\Actions\DeleteBulkAction::make(),
//                 ]),
//             ]);
//     }

//     public static function getPages(): array
//     {
//         return [
//             'index' => Pages\ListMahasiswas::route('/'),
//             'create' => Pages\CreateMahasiswa::route('/create'),
//             'edit' => Pages\EditMahasiswa::route('/{record}/edit'),
//         ];
//     }
// }


namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\Kelas;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Auth;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use App\Filament\Resources\KelasResource\Pages;

class KelasResource extends Resource
{
    protected static ?string $model = Kelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    // Menyembunyikan menu Kelas jika role bukan admin
    public static function canViewAny(): bool
    {
        return Auth::user()->role === 'admin';
    }


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nama_kelas')->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->query(
                Kelas::query()
                    ->when(Auth::user()->role === 'kelasAdmin', function ($query) {
                        return $query->whereNull('id'); // Menyembunyikan data untuk kelasAdmin
                    })
            )
            ->columns([
                TextColumn::make('nama_kelas')->sortable()->searchable(),
            ])
            ->actions([
                EditAction::make()->visible(fn() => Auth::user()->role === 'admin'),
                DeleteAction::make()->visible(fn() => Auth::user()->role === 'admin'),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListKelas::route('/'),
            'create' => Pages\CreateKelas::route('/create'),
            'edit' => Pages\EditKelas::route('/{record}/edit'),
        ];
    }
}
