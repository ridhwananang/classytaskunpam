<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoteResult extends Model
{
    protected $fillable = ['user_id', 'vote_id', 'type', 'vote_option_id'];

    public function vote()
    {
        return $this->belongsTo(Vote::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function option()
    {
        return $this->belongsTo(VoteOption::class);
    }
}
