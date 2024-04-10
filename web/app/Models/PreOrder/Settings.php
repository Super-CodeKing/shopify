<?php

namespace App\Models\PreOrder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;
    protected $guarded = []; 
    protected $table = 'pre_order_settings';
}
