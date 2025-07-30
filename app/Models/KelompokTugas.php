<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class KelompokTugas extends Model
{
    protected $fillable = ['tugas_id', 'nama_kelompok'];

    // Relasi many-to-many ke User (mahasiswa)
    public function mahasiswa()
    {
        return $this->belongsToMany(User::class, 'kelompok_tugas_user', 'kelompok_tugas_id', 'user_id');
    }

    // Relasi ke Tugas
    public function tugas()
    {
        return $this->belongsTo(Tugas::class, 'tugas_id');
    }
}
