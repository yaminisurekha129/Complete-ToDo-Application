<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $table = 'tasks'; 
    protected $fillable = ['task','user_id']; 


    public function user()
{
    return $this->belongsTo(User::class, 'user_id', 'id');
}

}

