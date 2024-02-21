<?php

namespace App\Http\Controllers;

use App\Models\ComingSoon\Setup;
use Illuminate\Http\Request;

class ComingSoonController extends Controller
{
    public function init(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $comingSoonInitSettings = Setup::where(['shop' => $shop])->first();

        if (!$comingSoonInitSettings) {
            return response()->json([
                'shop' => $shop,
                'activation' => [
                    'active' => config('comingsoon')["activation"],
                    'active_on_product' => config('comingsoon')["active_on_product"],
                    'active_on_collection' => config('comingsoon')["active_on_collection"],
                    'when_show_coming_soon' => config('comingsoon')["when_show_coming_soon"],
                    'specific_inventory' => config('comingsoon')["specific_inventory"],
                    'button_settings' => config('comingsoon')["button_settings"]
                ]
            ]);
        }

        return response()->json($comingSoonInitSettings);
    }

    public function save(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $activation = $request->active == 'true' ? 1 : 0;
        $activation_product = $request->active_on_product == 'true' ? 1 : 0;
        $activation_collection = $request->active_on_collection == 'true' ? 1 : 0;
        $whenToShowPreOrderButton = 2;
        $specificInventoryToShowPreOrderButton = 0;
        if($request->when_show_preorder == 'always') {
            $whenToShowPreOrderButton = 1;
        } else if($request->when_show_preorder == 'specific-inventory') {
            $whenToShowPreOrderButton = 3;
            $specificInventoryToShowPreOrderButton = (int)$request->specific_inventory;
        }

        $preOrderInitSettings = Setup::where(['shop' => $shop])->first();
        if (!$preOrderInitSettings) {
            $createdPreOrderSetup = Setup::create([
                'shop'                  => $shop,
                'active'                => $activation,
                'active_on_product'     => $activation_product,
                'active_on_collection'  => $activation_collection,
                'when_show_pre_order'   => $whenToShowPreOrderButton,
                'specific_inventory'    => $specificInventoryToShowPreOrderButton  
            ]);
            return response()->json([
                'message' => 'Pre Order Initial Data Saved Successfully.',
                'data' => $createdPreOrderSetup
            ], 201);
        } else {
            $updatedPreOrderSetup = Setup::where('shop', $shop)->update([
                'active'                => $activation,
                'active_on_product'     => $activation_product,
                'active_on_collection'  => $activation_collection,
                'when_show_pre_order'   => $whenToShowPreOrderButton,
                'specific_inventory'    => $specificInventoryToShowPreOrderButton
            ]);
            return response()->json([
                'message' => 'Pre Order Initial Data Updated Successfully.',
                'data' => $updatedPreOrderSetup
            ], 200);
        }
    }
}
