<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pertemuan extends Model
{
    use HasFactory;

    protected $fillable = [
        'jadwal_id',
        'topik',
        'waktu_dibuka',
        'waktu_ditutup',
    ];

    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'jadwal_id');
    }

    public function absensi()
    {
        return $this->hasMany(Absensi::class, 'pertemuan_id');
    }
}
