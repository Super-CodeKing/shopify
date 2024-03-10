<?php

namespace App\Models\RequestStock;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestedProducts extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'requested_products';
}
