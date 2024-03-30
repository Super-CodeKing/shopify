<?php

namespace App\Http\Controllers;

use App\Models\ComingSoon\Products;
use App\Models\PreOrderProducts;
use App\Models\RequestStock\Products as RequestStockProducts;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function appActivationDetect(Request $request)
    {

    }

    public function getSummary(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrder = PreOrderProducts::where('shop', $shop)->count();
        $comingSoon = Products::where('shop', $shop)->count();
        $requestStock = RequestStockProducts::where('shop', $shop)->count();

        return response()->json([
            'pre_order' => $preOrder,
            'coming_soon' => $comingSoon,
            'request_stock' => $requestStock
        ], 200);
    }

    public function storeQuickStart()
    {

    }

    public function getQuickStart()
    {

    }
}
