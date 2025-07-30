<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tugas extends Model
{
    use HasFactory;
    protected $table = 'tugas';
    protected $fillable = [
        'nama_tugas',
        'deskripsi',
        'deadline',
        'kelas_id',
        'category_id',
        'jadwals_id',
    ];

    // Relasi ke Kelas
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    // Relasi ke Jadwal
    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'jadwals_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // public function mahasiswa()
    // {
    //     return $this->belongsTo(User::class, 'mahasiswa_id');
    // }

    public function kelompokTugas()
    {
        return $this->hasMany(KelompokTugas::class, 'tugas_id');
    }
}
