<?php

namespace App\Http\Controllers;

use App\Models\ComingSoon\ColorsNText;
use App\Models\ComingSoon\Schedule;
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

    public function getComingSoonSchedule(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $comingSoonSchedule = Schedule::where(['shop' => $shop])->first();

        if (!$comingSoonSchedule) {
            return response()->json(config('comingsoon')['schedule']);
        }

        $comingSoonSchedule = json_decode($comingSoonSchedule, true);
        return response()->json($comingSoonSchedule);
    }

    public function storeComingSoonSchedule(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $startDate      = dateFormatToStore($request->start_date);
        $endDate        = dateFormatToStore($request->end_date);
        $noEndDate      = boolFormatToStore($request->no_end_date);
        $restockDate    = dateFormatToStore($request->restock_date);
        $noRestokDate   = boolFormatToStore($request->no_restock_date);

        $schedule = Schedule::where('shop', $shop)->first();

        if ($schedule) {
            $comingSoonSchedule = Schedule::where('shop', $shop)->update([
                'start_date' => $startDate,
                'end_date' => $endDate,
                'no_end_date' => $noEndDate,
                'estimated_restock_date' => $restockDate,
                'no_restock_date' => $noRestokDate
            ]);
        } else {
            $comingSoonSchedule = Schedule::create([
                'shop' => $shop,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'no_end_date' => $noEndDate,
                'estimated_restock_date' => $restockDate,
                'no_restock_date' => $noRestokDate
            ]);
        }

        return response()->json([
            'message' => 'Pre Order Schedule Saved Successfully.',
            'data' => $comingSoonSchedule
        ], 200);
    }
}
