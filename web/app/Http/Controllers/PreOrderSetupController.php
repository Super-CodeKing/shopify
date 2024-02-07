<?php

namespace App\Http\Controllers;

use App\Models\PreOrder\BadgeDesign;
use App\Models\PreOrderColorsNText;
use App\Models\PreOrderDisplayMessage;
use App\Models\PreOrderLimit;
use App\Models\PreOrderSchedule;
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
        $whenToShowPreOrderButton = 2;
        $specificInventoryToShowPreOrderButton = 0;
        if($request->when_show_preorder == 'always') {
            $whenToShowPreOrderButton = 1;
        } else if($request->when_show_preorder == 'specific-inventory') {
            $whenToShowPreOrderButton = 3;
            $specificInventoryToShowPreOrderButton = (int)$request->specific_inventory;
        }

        $preOrderInitSettings = PreOrderSetup::where(['shop' => $shop])->first();
        if (!$preOrderInitSettings) {
            $createdPreOrderSetup = PreOrderSetup::create([
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
            $updatedPreOrderSetup = PreOrderSetup::where('shop', $shop)->update([
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
                'inherit_from_theme' => $inherit_from_theme ? true : false,
                'settings' => json_encode($settings)
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

    public function storePreOrderSchedule(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $startDate = $this->dateFormatToStore($request->start_date);
        $endDate = $this->dateFormatToStore($request->end_date);
        $noEndDate = $this->boolFormatToStore($request->no_end_date);
        $restockDate = $this->dateFormatToStore($request->restock_date);
        $noRestokDate = $this->boolFormatToStore($request->no_restock_date);

        $schedule = PreOrderSchedule::where('shop', $shop)->first();

        if ($schedule) {
            $preOrderSchedule = PreOrderSchedule::where('shop', $shop)->update([
                'start_date' => $startDate,
                'end_date' => $endDate,
                'no_end_date' => $noEndDate,
                'estimated_restock_date' => $restockDate,
                'no_restock_date' => $noRestokDate
            ]);
        } else {
            $preOrderSchedule = PreOrderSchedule::create([
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

        $displayMessage = PreOrderDisplayMessage::where('shop', $shop)->first();

        if ($displayMessage) {
            $preOrderMessage = PreOrderDisplayMessage::where('shop', $shop)->update([
                'message' => $request->message,
                'position' => $request->position,
                'alignment' => $request->alignment
            ]);
        } else {
            $preOrderMessage = PreOrderDisplayMessage::create([
                'shop' => $shop,
                'message' => $request->message,
                'position' => $request->position,
                'alignment' => $request->alignment
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

        $badgeDesign = BadgeDesign::where('shop', $shop)->first();

        if ($badgeDesign) {
            $badgeDesign = BadgeDesign::where('shop', $shop)->update([
                'text'          => $request->text,
                'position'      => $request->position,
                'bg_color'      => $request->bg_color,
                'text_color'    => $request->text_color,
                'font_size'     => $request->font_size
            ]);
        } else {
            $badgeDesign = BadgeDesign::create([
                'shop'          => $shop,
                'text'          => $request->text,
                'position'      => $request->position,
                'bg_color'      => $request->bg_color,
                'text_color'    => $request->text_color,
                'font_size'     => $request->font_size
            ]);
        }

        return response()->json([
            'message' => 'Pre Order Badge Design Saved Successfully.',
            'data'    => $badgeDesign
        ], 200);
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
