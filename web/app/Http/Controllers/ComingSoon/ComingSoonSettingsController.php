<?php

namespace App\Http\Controllers\ComingSoon;

use App\Http\Controllers\Controller;
use App\Models\ComingSoon\Badge;
use App\Models\ComingSoon\ColorsNText;
use App\Models\ComingSoon\DisplayMessage;
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
            'message' => 'Coming Soon Schedule Saved Successfully.',
            'data' => $comingSoonSchedule
        ], 200);
    }

    public function storeDisplayMessage(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $displayMessage = DisplayMessage::where('shop', $shop)->first();

        if ($displayMessage) {
            $comingSoonMessage = DisplayMessage::where('shop', $shop)->update([
                'message' => $request->message,
                'position' => $request->position,
                'alignment' => $request->alignment
            ]);
        } else {
            $comingSoonMessage = DisplayMessage::create([
                'shop' => $shop,
                'message' => $request->message,
                'position' => $request->position,
                'alignment' => $request->alignment
            ]);
        }

        return response()->json([
            'message' => 'Coming Soon Display Message Saved Successfully.',
            'data' => $comingSoonMessage
        ], 200);
    }

    public function getDisplayMessage(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $comingSoonDisplayMessage = DisplayMessage::where('shop', $shop)->first();
        if (!$comingSoonDisplayMessage) {
            return response()->json(config('comingsoon')['display_message']);
        }
        $comingSoonDisplayMessage = json_decode($comingSoonDisplayMessage, true);
        
        return response()->json($comingSoonDisplayMessage);
    }

    public function getBadgeDesign(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $comingSoonBadgeDesign = Badge::where('shop', $shop)->first();

        if (!$comingSoonBadgeDesign) {
            return response()->json(config('comingsoon')['badge_design']);
        }

        $comingSoonBadgeDesign = json_decode($comingSoonBadgeDesign, true);
        return response()->json($comingSoonBadgeDesign);
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
            'message' => 'Coming Soon Badge Design Saved Successfully.',
            'data'    => $badgeDesign
        ], 200);
    }
}
