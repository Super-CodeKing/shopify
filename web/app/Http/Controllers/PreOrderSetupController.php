<?php

namespace App\Http\Controllers;

use App\Models\PreOrderColorsNText;
use App\Models\PreOrderLimit;
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

    public function colorNText(Request $request) 
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $inherit_from_theme = $request->inherit_from_theme;
        $settings = $request->settings;

        $preOrderColorsSettings = PreOrderColorsNText::where(['shop' => $shop])->first();

        if (!$preOrderColorsSettings) {
            $createdPreOrderSetup = PreOrderColorsNText::create([
                'shop' => $shop,
                'inherit_from_theme' => $inherit_from_theme ? true : false,
                'settings' => json_encode($settings)
            ]);
            return response()->json([
                'message' => 'Button Colors and Text Settings Saved Successfully.',
                'data' => $createdPreOrderSetup
            ], 201);
        } else {
            $updatedPreOrderColorsSettings = PreOrderColorsNText::where('shop', $shop)->update([
                'inherit_from_theme' => $inherit_from_theme ? true: false,
                'settings' => json_encode($settings)
            ]);
            return response()->json([
                'message' => 'Button Colors and Text Settings Updated Successfully.',
                'data' => $updatedPreOrderColorsSettings
            ], 200);
        }
    }

    public function getColorNTextSettings(Request $request) {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderButtonSettings = PreOrderColorsNText::where(['shop' => $shop])->first();

        if (!$preOrderButtonSettings) {
            return response()->json(config('preorder')['button_settings']);
        }

        $preOrderButtonSettings->settings = json_decode($preOrderButtonSettings->settings, true);
        return response()->json($preOrderButtonSettings);
    }

    public function getOrderLimit(Request $request) {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderLimitSettings = PreOrderLimit::where(['shop' => $shop])->first();

        if (!$preOrderLimitSettings) {
            return response()->json(config('preorder')['limit']);
        }

        $preOrderLimitSettings->limit = json_decode($preOrderLimitSettings->limit, true);
        return response()->json($preOrderLimitSettings);
    }

    public function storeOrderLimit(Request $request) {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $limit = $request->limit;

        $preOrderLimitSettings = PreOrderLimit::where(['shop' => $shop])->first();
        if (!$preOrderLimitSettings) {
            $createdPreOrderLimit = PreOrderLimit::create([
                'shop' => $shop,
                'limit' => json_encode($limit),
            ]);
            return response()->json([
                'message' => 'Pre Order Limit Data Saved Successfully.',
                'data' => $createdPreOrderLimit
            ], 201);
        } else {
            $updatedPreOrderLimit = PreOrderLimit::where('shop', $shop)->update([
                'limit' => json_encode($limit),
            ]);
            return response()->json([
                'message' => 'Pre Order Limit Data Updated Successfully.',
                'data' => $updatedPreOrderLimit
            ], 200);
        }
    }
}
