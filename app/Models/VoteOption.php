<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoteOption extends Model
{
    protected $fillable = ['vote_id', 'label'];

    public function vote()
    {
        return $this->belongsTo(Vote::class);
    }

    public function results()
    {
        return $this->hasMany(VoteResult::class);
    }
}
