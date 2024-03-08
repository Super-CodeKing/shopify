<?php

namespace App\Models\RequestStock;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activation extends Model
{
    use HasFactory;
    protected $guarded = []; 
    protected $table = 'request_stock_setups';
}
