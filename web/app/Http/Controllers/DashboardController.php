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
        $quickStartData = $request->all();
        $convertedQuickStartData = array_map('intval', $quickStartData);

        $convertedQuickStartData['shop'] = $shop;
        $validator = $this->validateQuickStartData($convertedQuickStartData);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $existingEntry = QuickStart::where('shop', $convertedQuickStartData['shop'])->first();

        if ($existingEntry) $existingEntry->update($convertedQuickStartData);
        else QuickStart::create($convertedQuickStartData);

        return response()->json(['message' => 'Entry created or updated successfully'], 201);
    }

    public function getQuickStart(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        return response()->json(QuickStart::where('shop', $shop)->first());
    }

    private function validateQuickStartData($data)
    {
        return Validator::make($data, [
            'pre_order' => 'required|integer',
            'coming_soon' => 'required|integer',
            'request_stock' => 'required|integer',
            'shop' => 'required|string',
        ]);
    }
}
