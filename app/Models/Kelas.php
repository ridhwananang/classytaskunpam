<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Kelas extends Model
{
    use HasFactory;
    protected $table = 'kelas'; // Sesuaikan dengan nama tabel di database jika berbeda
    protected $fillable = ['nama_kelas']; // Sesuaikan dengan kolom yang bisa diisi

    public function jadwals()

    {
        return $this->hasMany(Jadwal::class, 'kelas_id');
    }

    public function tugas()
    {
        return $this->hasMany(Tugas::class, 'kelas_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'kelas_id');
    }
    public function mahasiswas()
    {
        return $this->hasMany(User::class, 'kelas_id')->whereIn('role', ['mahasiswa', 'kelasAdmin']);
    }

    public function forums()
    {
        return $this->hasMany(Forum::class);
    }
}
