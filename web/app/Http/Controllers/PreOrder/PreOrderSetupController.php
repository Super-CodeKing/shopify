<?php

namespace App\Http\Controllers;

use App\Models\PreOrder\BadgeDesign;
use App\Models\PreOrder\Settings;
use App\Models\PreOrderColorsNText;
use App\Models\PreOrderDisplayMessage;
use App\Models\PreOrderLimit;
use App\Models\PreOrderSchedule;
use App\Models\PreOrderSetup;
use Illuminate\Http\Request;

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

        $activationJSON = $this->makePreOrderActivationData($request);

        $preOrderInitSettings = Settings::where(['shop' => $shop])->first();

        if (!$preOrderInitSettings) {
            $createdPreOrderSetup = Settings::create([
                'shop'                  => $shop,
                'activation'            => $activationJSON
            ]);
            return response()->json([
                'message' => 'Pre Order Data Saved Successfully.',
                'data' => $createdPreOrderSetup
            ], 201);
        } else {
            $updatedPreOrderSetup = Settings::where('shop', $shop)->update([
                'activation' => $activationJSON
            ]);
            return response()->json([
                'message' => 'Pre Order Data Updated Successfully.',
                'data' => $updatedPreOrderSetup
            ], 200);
        }
    }

    public function colorNText(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderColorsSettings = Settings::where(['shop' => $shop])->first();
        $settings = $this->makePreOrderColors($request);

        if (!$preOrderColorsSettings) {
            $createdPreOrderSetup = Settings::create([
                'shop' => $shop,
                'colors' => json_encode($settings)
            ]);
            return response()->json([
                'message' => 'Button Colors and Text Settings Saved Successfully.',
                'data' => $createdPreOrderSetup
            ], 201);
        } else {
            $updatedPreOrderColorsSettings = Settings::where('shop', $shop)->update([
                'colors' => json_encode($settings)
            ]);
            return response()->json([
                'message' => 'Button Colors and Text Settings Updated Successfully.',
                'data' => $updatedPreOrderColorsSettings
            ], 200);
        }
    }

    public function getColorNTextSettings(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderButtonSettings = PreOrderColorsNText::where(['shop' => $shop])->first();

        if (!$preOrderButtonSettings) {
            return response()->json(config('preorder')['button_settings']);
        }

        $preOrderButtonSettings->settings = json_decode($preOrderButtonSettings->settings, true);
        return response()->json($preOrderButtonSettings);
    }

    public function getOrderLimit(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderLimitSettings = PreOrderLimit::where(['shop' => $shop])->first();

        if (!$preOrderLimitSettings) {
            return response()->json(config('preorder')['limit']);
        }

        $preOrderLimitSettings->limit = json_decode($preOrderLimitSettings->limit, true);
        return response()->json($preOrderLimitSettings);
    }

    public function storeOrderLimit(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $limit = $request->limit;

        $preOrderLimitSettings = Settings::where(['shop' => $shop])->first();
        if (!$preOrderLimitSettings) {
            $createdPreOrderLimit = Settings::create([
                'shop' => $shop,
                'order_limit' => json_encode($limit),
            ]);
            return response()->json([
                'message' => 'Pre Order Limit Data Saved Successfully.',
                'data' => $createdPreOrderLimit
            ], 201);
        } else {
            $updatedPreOrderLimit = Settings::where('shop', $shop)->update([
                'order_limit' => json_encode($limit),
            ]);
            return response()->json([
                'message' => 'Pre Order Limit Data Updated Successfully.',
                'data' => $updatedPreOrderLimit
            ], 200);
        }
    }

    public function storePreOrderSchedule(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $schedule = Settings::where('shop', $shop)->first();

        if ($schedule) {
            $preOrderSchedule = Settings::where('shop', $shop)->update([
                'schedule' => $this->makePreOrderScheduleData($request)
            ]);
        } else {
            $preOrderSchedule = Settings::create([
                'shop' => $shop,
                'schedule' => $this->makePreOrderScheduleData($request)
            ]);
        }

        return response()->json([
            'message' => 'Pre Order Schedule Saved Successfully.',
            'data' => $preOrderSchedule
        ], 200);
    }

    public function getPreOrderSchedule(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderSchedule = PreOrderSchedule::where(['shop' => $shop])->first();

        if (!$preOrderSchedule) {
            return response()->json(config('preorder')['schedule']);
        }

        $preOrderSchedule = json_decode($preOrderSchedule, true);
        return response()->json($preOrderSchedule);
    }

    public function storeDisplayMessage(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $displayMessage = Settings::where('shop', $shop)->first();

        if ($displayMessage) {
            $preOrderMessage = Settings::where('shop', $shop)->update([
                'display_message' => $this->makeDisplayMessage($request)
            ]);
        } else {
            $preOrderMessage = Settings::create([
                'shop' => $shop,
                'display_message' => $this->makeDisplayMessage($request)
            ]);
        }

        return response()->json([
            'message' => 'Pre Order Display Message Saved Successfully.',
            'data' => $preOrderMessage
        ], 200);
    }

    public function getDisplayMessage(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderDisplayMessage = PreOrderDisplayMessage::where('shop', $shop)->first();
        if (!$preOrderDisplayMessage) {
            return response()->json(config('preorder')['display_message']);
        }
        $preOrderDisplayMessage = json_decode($preOrderDisplayMessage, true);
        
        return response()->json($preOrderDisplayMessage);
    }

    public function getBadgeDesign(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderBadgeDesign = BadgeDesign::where('shop', $shop)->first();

        if (!$preOrderBadgeDesign) {
            return response()->json(config('preorder')['badge_design']);
        }

        $preOrderBadgeDesign = json_decode($preOrderBadgeDesign, true);
        
        return response()->json($preOrderBadgeDesign);
    }

    public function storeBadgeDesign(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $badgeDesign = Settings::where('shop', $shop)->first();

        if ($badgeDesign) {
            $badgeDesign = Settings::where('shop', $shop)->update([
                'badge_design' => $this->makeBadgeDesign($request)
            ]);
        } else {
            $badgeDesign = Settings::create([
                'shop'          => $shop,
                'badge_design' => $this->makeBadgeDesign($request)
            ]);
        }

        return response()->json([
            'message' => 'Pre Order Badge Design Saved Successfully.',
            'data'    => $badgeDesign
        ], 200);
    }

    private function makePreOrderActivationData($request)
    {
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

        $activationJSON = json_encode([
            "active" => $activation,
            "active_on_product" => $activation_product,
            "active_on_collection" => $activation_collection,
            "when_show_pre_order" => $whenToShowPreOrderButton,
            "specific_inventory" => $specificInventoryToShowPreOrderButton
        ]);

        return $activationJSON;
    }

    private function makePreOrderScheduleData($request)
    {
        $startDate = $this->dateFormatToStore($request->start_date);
        $endDate = $this->dateFormatToStore($request->end_date);
        $noEndDate = $this->boolFormatToStore($request->no_end_date);
        $restockDate = $this->dateFormatToStore($request->restock_date);
        $noRestokDate = $this->boolFormatToStore($request->no_restock_date);

        $scheduleJSON = json_encode([
            "start_date" => $startDate,
            "end_date" => $endDate,
            "no_end_date" => $noEndDate,
            "estimated_restock_date" => $restockDate,
            "no_restock_date" => $noRestokDate
        ]);

        return $scheduleJSON;
    }

    private function makeBadgeDesign($request)
    {
        $activationJSON = json_encode([
            'text'          => $request->text,
            'position'      => $request->position,
            'bg_color'      => $request->bg_color,
            'text_color'    => $request->text_color,
            'font_size'     => $request->font_size
        ]);
        return $activationJSON;
    }

    private function makeDisplayMessage($request)
    {
        $activationJSON = json_encode([
            'message' => $request->message,
            'position' => $request->position,
            'alignment' => $request->alignment
        ]);
        return $activationJSON;
    }

    private function makePreOrderColors($request)
    {   
        $inheritTheme = 0;
        if($request->inherit_from_theme == false || $request->inherit_from_theme == 'false') {
            $inheritTheme = 0;
        }
        else if($request->inherit_from_theme == true || $request->inherit_from_theme == 'true') {
            $inheritTheme = 1;
        }

        $settings = json_decode($request->settings, true);
        $settings['inherit_from_theme'] = $inheritTheme;

        return $settings;
    }

    private function dateFormatToStore($requestDate)
    {
        $date = '';
        if ($requestDate == "null" || $requestDate == NULL || $requestDate == "") {
            $date = NULL;
        } else {
            $date = date('Y-m-d H:i:s', strtotime($requestDate));
        }
        return $date;
    }

    private function boolFormatToStore($requestBool) {
        $value = false;
        if($requestBool == "0" || $requestBool == 0 || $requestBool == false) {
            $value = false;
        } else if($requestBool == "1" || $requestBool == 1 || $requestBool == true) {
            $value = true;
        }
        return $value;
    }
}
