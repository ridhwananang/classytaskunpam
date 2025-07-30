<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = ['category'];

    public function tugas()
    {
        return $this->hasMany(Tugas::class, 'category_id');
    }
}
