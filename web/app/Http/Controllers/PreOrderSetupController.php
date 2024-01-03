<?php

namespace App\Http\Controllers;

use App\Models\PreOrderSetup;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class PreOrderSetupController extends Controller
{
    public function init(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderInitSettings = PreOrderSetup::where(['shop' => $shop])->first();

        if (!$preOrderInitSettings) {
            return response()->json(config('preorder'));
        }

        return response()->json($preOrderInitSettings);
    }

    public function save(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $activation = $request->active == 'true' ? 1 : 0;
        $activation_product = $request->active_on_product == 'true' ? 1 : 0;
        $activation_collection = $request->active_on_collection == 'true' ? 1 : 0;

        $preOrderInitSettings = PreOrderSetup::where(['shop' => $shop])->first();
        if (!$preOrderInitSettings) {
            $createdPreOrderSetup = PreOrderSetup::create([
                'shop' => $shop,
                'active' => $activation,
                'active_on_product' => $activation_product,
                'active_on_collection' => $activation_collection
            ]);
            return response()->json([
                'message' => 'Pre Order Initial Data Saved Successfully.',
                'data' => $createdPreOrderSetup
            ], 201);
        } else {
            $updatedPreOrderSetup = PreOrderSetup::where('shop', $shop)->update([
                'active' => $activation,
                'active_on_product' => $activation_product,
                'active_on_collection' => $activation_collection
            ]);
            return response()->json([
                'message' => 'Pre Order Initial Data Updated Successfully.',
                'data' => $updatedPreOrderSetup
            ], 200);
        }
    }
}
