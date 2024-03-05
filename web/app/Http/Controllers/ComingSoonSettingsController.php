<?php

namespace App\Http\Controllers;

use App\Models\ComingSoon\ColorsNText;
use Illuminate\Http\Request;

class ComingSoonSettingsController extends Controller
{
    public function getColorNTextSettings(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $comingSoonButtonSettings = ColorsNText::where(['shop' => $shop])->first();

        if (!$comingSoonButtonSettings) {
            return response()->json(config('comingsoon')['button_settings']);
        }

        $comingSoonButtonSettings->settings = json_decode($comingSoonButtonSettings->settings, true);
        return response()->json($comingSoonButtonSettings);
    }

    public function colorNText(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $settings = $request->settings;

        $comingSoonColorsSettings = ColorsNText::where(['shop' => $shop])->first();

        $inheritTheme = 0;
        if($request->inherit_from_theme == false || $request->inherit_from_theme == 'false') {
            $inheritTheme = 0;
        }
        else if($request->inherit_from_theme == true || $request->inherit_from_theme == 'true') {
            $inheritTheme = 1;
        }

        if (!$comingSoonColorsSettings) {
            $createdComingSoonSetup = ColorsNText::create([
                'shop' => $shop,
                'inherit_from_theme' => $inheritTheme,
                'settings' => json_encode($settings)
            ]);
            return response()->json([
                'message' => 'Button Colors and Text Settings Saved Successfully.',
                'data' => $createdComingSoonSetup
            ], 201);
        } else {
            $updatedComingSoonColorsSettings = ColorsNText::where('shop', $shop)->update([
                'inherit_from_theme' => $inheritTheme,
                'settings' => json_encode($settings)
            ]);
            return response()->json([
                'message' => 'Button Colors and Text Settings Updated Successfully.',
                'data' => $updatedComingSoonColorsSettings
            ], 200);
        }
    }
}
