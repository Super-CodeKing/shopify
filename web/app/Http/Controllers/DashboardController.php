<?php

namespace App\Http\Controllers;

use App\Models\ComingSoon\Products;
use App\Models\PreOrderProducts;
use App\Models\QuickStart;
use App\Models\RequestStock\Products as RequestStockProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function storeQuickStart(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $data = $request->all();
        $convertedData = array_map('intval', $data);

        $convertedData['shop'] = $shop;

        $validator = Validator::make($convertedData, [
            'pre_order' => 'required|integer',
            'coming_soon' => 'required|integer',
            'request_stock' => 'required|integer',
            'shop' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $existingEntry = QuickStart::where('shop', $convertedData['shop'])->first();

        if ($existingEntry) {
            $existingEntry->update($convertedData);
        } else {
            QuickStart::create($convertedData);
        }
        return response()->json(['message' => 'Entry created or updated successfully'], 201);
    }

    public function getQuickStart(Request $request)
    {
        // $session = $request->get('shopifySession');
        // $shop = $session->getShop();
        return response()->json(QuickStart::where('shop', $request->shop)->first());
    }
}
