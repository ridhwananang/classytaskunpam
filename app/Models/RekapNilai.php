<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RekapNilai extends Model
{
    protected $fillable = ['user_id', 'jadwal_id', 'tugas', 'uts', 'uas', 'kehadiran', 'nilai'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class);
    }
}
