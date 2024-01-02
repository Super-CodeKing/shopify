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
            return new JsonResponse(['PreOrderInitSetup' => config('preorder')]);
        }

        return new JsonResponse(['PreOrderInitSetup' => $preOrderInitSettings]);
    }

    public function save(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderInitSettings = PreOrderSetup::where(['shop' => $shop])->first();
        if (!$preOrderInitSettings) {
            $createdPreOrderSetup = PreOrderSetup::create([
                'shop' => $shop,
                'active' => $request->active,
                'active_on_product' => $request->active_on_product,
                'active_on_collection' => $request->active_on_collection
            ]);
            return new JsonResponse($createdPreOrderSetup, 201);
        } else {
            $updatedPreOrderSetup = PreOrderSetup::where('shop', $shop)->update([
                'active' => $request->active,
                'active_on_product' => $request->active_on_product,
                'active_on_collection' => $request->active_on_collection
            ]);
            return new JsonResponse($updatedPreOrderSetup, 200);
        }
    }
}
