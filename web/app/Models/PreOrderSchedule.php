<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreOrderSchedule extends Model
{
    use HasFactory;
    protected $fillable = ['shop', 'start_date', 'end_date', 'estimated_restock_date'];
}
