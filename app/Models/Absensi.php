<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $fillable = ['user_id', 'waktu', 'jadwal_id', 'status', 'pertemuan_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function pertemuan()
    {
        return $this->belongsTo(Pertemuan::class, 'pertemuan_id');
    }
}
