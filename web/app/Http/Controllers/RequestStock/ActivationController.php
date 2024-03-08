<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\Activation;
use Illuminate\Http\Request;

class ActivationController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockInitSettings = Activation::where(['shop' => $shop])->first();

        if (!$requestStockInitSettings) {
            $data = config('requeststock');
            $data['shop'] = $shop;
            return response()->json($data);
        }
        return response()->json($requestStockInitSettings);
    }

    public function store(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $activation             = $request->active == 'true' ? 1 : 0;
        $activation_product     = $request->active_on_product == 'true' ? 1 : 0;
        $activation_collection  = $request->active_on_collection == 'true' ? 1 : 0;

        $whenToShowRequestStockButton = 2;
        $specificInventoryToShowRequestStockButton = 0;

        if($request->when_show_request_stock == 'always') {
            $whenToShowRequestStockButton = 1;
        } else if($request->when_show_request_stock == 'specific-inventory') {
            $whenToShowRequestStockButton = 3;
            $specificInventoryToShowRequestStockButton = (int)$request->specific_inventory;
        }

        $requestStockInitSettings = Activation::where(['shop' => $shop])->first();
        if (!$requestStockInitSettings) {
            $createdComingSoonSetup = Activation::create([
                'shop'                      => $shop,
                'active'                    => $activation,
                'active_on_product'         => $activation_product,
                'active_on_collection'      => $activation_collection,
                'when_show_request_stock'   => $whenToShowRequestStockButton,
                'specific_inventory'        => $specificInventoryToShowRequestStockButton  
            ]);
            return response()->json([
                'message' => 'Request Stock Initial Data Saved Successfully.',
                'data' => $createdComingSoonSetup
            ], 201);
        } else {
            $updatedRequestStockSetup = Activation::where('shop', $shop)->update([
                'active'                    => $activation,
                'active_on_product'         => $activation_product,
                'active_on_collection'      => $activation_collection,
                'when_show_request_stock'   => $whenToShowRequestStockButton,
                'specific_inventory'        => $specificInventoryToShowRequestStockButton
            ]);
            return response()->json([
                'message' => 'Request Stock Initial Data Updated Successfully.',
                'data' => $updatedRequestStockSetup
            ], 200);
        }
    }
}
