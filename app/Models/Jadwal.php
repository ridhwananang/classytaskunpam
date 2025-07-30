<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Jadwal extends Model
{
    use HasFactory;

    protected $table = 'jadwals';

    protected $fillable = [
        'kelas_id',
        'dosen_id',
        'nama_matkul',
        'ruang',
        'hari',
        'waktu_mulai',
        'waktu_selesai',
        'sks',
        'whatsapp',
    ];

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function tugas()
    {
        return $this->hasMany(Tugas::class, 'jadwals_id');
    }
    public function pertemuan()
    {
        return $this->hasMany(Pertemuan::class, 'jadwal_id');
    }
    public function dosen(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dosen_id');
    }
}
