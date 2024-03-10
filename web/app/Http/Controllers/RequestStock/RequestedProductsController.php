<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\RequestedProducts;
use Illuminate\Http\Request;

class RequestedProductsController extends Controller
{
    public function index(Request $request)
    {
        // $limit = $request->limit;
        // $offset = $request->offset;

        return response()->json(RequestedProducts::all());
    }
}
