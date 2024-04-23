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
        $whenToShowComingSoonButton = 2;
        $specificInventoryToShowComingSoonButton = 0;
        if($request->when_show_preorder == 'always') {
            $whenToShowComingSoonButton = 1;
        } else if($request->when_show_preorder == 'specific-inventory') {
            $whenToShowComingSoonButton = 3;
            $specificInventoryToShowComingSoonButton = (int)$request->specific_inventory;
        }

        $comingSoonInitSettings = Setup::where(['shop' => $shop])->first();
        if (!$comingSoonInitSettings) {
            $createdComingSoonSetup = Setup::create([
                'shop'                  => $shop,
                'active'                => $activation,
                'active_on_product'     => $activation_product,
                'active_on_collection'  => $activation_collection,
                'when_show_coming_soon' => $whenToShowComingSoonButton,
                'specific_inventory'    => $specificInventoryToShowComingSoonButton  
            ]);
            return response()->json([
                'message' => 'Coming Soon Initial Data Saved Successfully.',
                'data' => $createdComingSoonSetup
            ], 201);
        } else {
            $updatedComingSoonSetup = Setup::where('shop', $shop)->update([
                'active'                => $activation,
                'active_on_product'     => $activation_product,
                'active_on_collection'  => $activation_collection,
                'when_show_coming_soon' => $whenToShowComingSoonButton,
                'specific_inventory'    => $specificInventoryToShowComingSoonButton
            ]);
            return response()->json([
                'message' => 'Coming Soon Initial Data Updated Successfully.',
                'data' => $updatedComingSoonSetup
            ], 200);
        }
    }
}
