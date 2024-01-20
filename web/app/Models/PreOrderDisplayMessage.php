<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreOrderDisplayMessage extends Model
{
    use HasFactory;
    protected $fillable = ['shop', 'message', 'position', 'alignment'];
}
