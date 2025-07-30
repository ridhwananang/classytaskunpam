<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Forum extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kelas_id',
        'judul',
        'isi',
        'slug',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    protected static function booted()
    {
        static::creating(function ($forum) {
            $forum->slug = Str::slug($forum->judul);
        });
        static::updating(function ($forum) {
            $forum->slug = Str::slug($forum->judul);
        });
    }
}
