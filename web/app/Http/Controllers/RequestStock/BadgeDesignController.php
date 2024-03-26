<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\Badge;
use Illuminate\Http\Request;

class BadgeDesignController extends Controller
{
    public function getBadgeDesign(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockBadgeDesign = Badge::where('shop', $shop)->first();

        if (!$requestStockBadgeDesign) {
            return response()->json(config('requeststock')['badge_design']);
        }

        $requestStockBadgeDesign = json_decode($requestStockBadgeDesign, true);
        return response()->json($requestStockBadgeDesign);
    }

    public function storeBadgeDesign(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $badgeDesign = Badge::where('shop', $shop)->first();

        if ($badgeDesign) {
            $badgeDesign = Badge::where('shop', $shop)->update([
                'text'          => $request->text,
                'position'      => $request->position,
                'bg_color'      => $request->bg_color,
                'text_color'    => $request->text_color,
                'font_size'     => $request->font_size
            ]);
        } else {
            $badgeDesign = Badge::create([
                'shop'          => $shop,
                'text'          => $request->text,
                'position'      => $request->position,
                'bg_color'      => $request->bg_color,
                'text_color'    => $request->text_color,
                'font_size'     => $request->font_size
            ]);
        }

        return response()->json([
            'message' => 'Badge Design Saved Successfully.',
            'data'    => $badgeDesign
        ], 200);
    }
}
