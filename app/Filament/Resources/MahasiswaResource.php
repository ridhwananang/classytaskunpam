<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\User;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Auth;
use App\Filament\Resources\MahasiswaResource\Pages;

class MahasiswaResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nim')
                    ->label('NIM')
                    ->numeric()
                    ->required()
                    ->unique(ignoreRecord: true),

                Forms\Components\TextInput::make('name')
                    ->label('Nama')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),

                Forms\Components\Select::make('kelas_id')
                    ->label('Kelas')
                    ->relationship('kelas', 'nama_kelas')
                    ->required()
                    ->disabled(fn() => Auth::user()->role === 'kelasAdmin')
                    ->default(fn() => Auth::user()->kelas_id),

                Forms\Components\TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->required()
                    ->maxLength(255)
                    ->hiddenOn('edit'),

                Forms\Components\Select::make('role')
                    ->label('Role')
                    ->options([
                        'admin' => 'Super Admin',
                        'kelasAdmin' => 'Admin Kelas',
                        'mahasiswa' => 'Mahasiswa',
                    ])
                    ->required()
                    ->disabled(fn() => Auth::user()->role === 'kelasAdmin')
                    ->default('mahasiswa'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->query(
                User::query()->when(Auth::check() && Auth::user()->role === 'kelasAdmin', function ($query) {
                    return $query->where('kelas_id', Auth::user()->kelas_id);
                })
            )

            ->columns([
                Tables\Columns\TextColumn::make('nim')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('name')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('email')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('kelas.nama_kelas')->sortable()->label('Kelas'),
                Tables\Columns\TextColumn::make('role')->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->label('Filter Role')
                    ->options([
                        'kelasAdmin' => 'Admin Kelas',
                        'admin' => 'Super Admin',
                        'mahasiswa' => 'Mahasiswa',
                    ]),
                Tables\Filters\SelectFilter::make('kelas_id')
                    ->label('Filter Kelas')
                    ->relationship('kelas', 'nama_kelas'),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMahasiswas::route('/'),
            'create' => Pages\CreateMahasiswa::route('/create'),
            'edit' => Pages\EditMahasiswa::route('/{record}/edit'),
        ];
    }
}
