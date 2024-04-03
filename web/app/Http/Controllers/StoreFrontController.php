<?php

namespace App\Http\Controllers;

use App\Models\ComingSoon\Products;
use App\Models\PreOrderProducts;
use App\Models\QuickStart;
use App\Models\RequestStock\Products as RequestStockProducts;
use Illuminate\Http\Request;

class StoreFrontController extends Controller
{
    public function getQuickStart(Request $request)
    {
        return response()->json(QuickStart::where('shop', $request->shop)->first());
    }

    public function getProductAvailability(Request $request)
    {
        $preOrder = PreOrderProducts::where([
            'shop' =>  $request->shop,
            'product_id' => $request->product_id
        ])->first();

        $comingSoon = Products::where([
            'shop' =>  $request->shop,
            'product_id' => $request->product_id
        ])->first();

        $requestStock = RequestStockProducts::where([
            'shop' =>  $request->shop,
            'product_id' => $request->product_id
        ])->first();

        return response()->json([
            'pre_order' => $preOrder,
            'coming_soon' => $comingSoon,
            'request_stock' => $requestStock
        ]);
    }
}
