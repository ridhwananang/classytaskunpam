<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['judul', 'deskripsi', 'deadline', 'kelas_id'];

    public function results()
    {
        return $this->hasMany(VoteResult::class);
    }

    public function upvotes()
    {
        return $this->results()->where('type', 'up');
    }

    public function downvotes()
    {
        return $this->results()->where('type', 'down');
    }

    public function isClosed()
    {
        return now()->gt($this->deadline);
    }
    public function options()
    {
        return $this->hasMany(VoteOption::class);
    }
    public function userResult()
    {
        return $this->hasOne(VoteResult::class)->where('user_id', Auth::id());
    }
    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}
