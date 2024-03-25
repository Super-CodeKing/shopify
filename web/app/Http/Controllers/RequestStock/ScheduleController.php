<?php

namespace App\Http\Controllers\RequestStock;

use App\Http\Controllers\Controller;
use App\Models\RequestStock\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function getRequestStockSchedule(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $requestStockSchedule = Schedule::where(['shop' => $shop])->first();

        if (!$requestStockSchedule) {
            return response()->json(config('requeststock')['schedule']);
        }

        $requestStockSchedule = json_decode($requestStockSchedule, true);
        return response()->json($requestStockSchedule);
    }

    public function storeRequestStockSchedule(Request $request)
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
            $requestStockSchedule = Schedule::where('shop', $shop)->update([
                'start_date' => $startDate,
                'end_date' => $endDate,
                'no_end_date' => $noEndDate,
                'estimated_restock_date' => $restockDate,
                'no_restock_date' => $noRestokDate
            ]);
        } else {
            $requestStockSchedule = Schedule::create([
                'shop' => $shop,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'no_end_date' => $noEndDate,
                'estimated_restock_date' => $restockDate,
                'no_restock_date' => $noRestokDate
            ]);
        }

        return response()->json([
            'message' => 'Schedule Saved Successfully.',
            'data' => $requestStockSchedule
        ], 200);
    }
}
