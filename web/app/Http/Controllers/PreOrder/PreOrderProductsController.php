<?php

namespace App\Http\Controllers\PreOrder;

use App\Http\Controllers\Controller;
use App\Models\PreOrderProducts;
use Illuminate\Http\Request;
use SebastianBergmann\Type\NullType;

class PreOrderProductsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderProducts = PreOrderProducts::where('shop', $shop)->get();
        return response()->json([
            'data' => $preOrderProducts
        ], 200);
    }

    public function store(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderProductArray = json_decode($request->getContent(), true);
        $makeData = [];

        for($i = 0; $i < count($preOrderProductArray); $i++) {
            $singleProductData = $preOrderProductArray[$i];

            $singleProductData['shop'] = $shop;

            $startDate = '';
            if($singleProductData['start_date'] == "null" || $singleProductData['start_date'] == NULL) {
                $startDate = NULL;
            } else {
                $startDate = date('Y-m-d H:i:s', strtotime($singleProductData['start_date']));
            }

            $singleProductData['start_date'] = $startDate;

            $endDate = '';
            if($singleProductData['end_date'] == "null" || $singleProductData['end_date'] == NULL) {
                $endDate = NULL;
            } else {
                $endDate = date('Y-m-d H:i:s', strtotime($singleProductData['end_date']));
            }

            $singleProductData['end_date'] = $endDate;

            $orderLimit = '';
            if($singleProductData['order_limit'] == "null" || $singleProductData['order_limit'] == NULL || $singleProductData['order_limit'] == "") {
                $orderLimit = NULL;
            } else {
                $orderLimit = intval($singleProductData['order_limit']);
            }

            $singleProductData['order_limit'] = $orderLimit;
            $singleProductData['display_message'] = $singleProductData['display_message'] == 1 ? 1 : 0;
            $singleProductData['display_badge'] = $singleProductData['display_badge'] == 1 ? 1 : 0;

            array_push($makeData, $singleProductData);
        }

        $result = [];
        foreach ($makeData as $data) {
            $r = PreOrderProducts::create($data);
            array_push($result, $r);
        }

        return response()->json([
            'message' => 'Product Saved Successfully',
            'data' => $result
        ], 201);
    }

    public function update(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $start_date = $request->start_date != "null" ? date('Y-m-d H:i:s', strtotime($request->start_date)) : null;
        $end_date = $request->end_date != "null" ? date('Y-m-d H:i:s', strtotime($request->end_date)) : null;
        $orderLimit = $request->order_limit != "null" ? intval($request->order_limit) : null;
        $displayMessage = $request->display_message == 1 ? 1 : 0;
        $displayBadge = $request->display_badge == 1 ? 1 : 0;

        $preOrderProduct = PreOrderProducts::where('shop', $shop)
            ->where('id', $request->id)
            ->where('product_id', $request->product_id)
            ->update([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'order_limit' => $orderLimit,
                'display_message' => $displayMessage,
                'display_badge' => $displayBadge,
            ]);

        return response()->json([
            'message' => 'Product Updated Successfully',
            'data' => $preOrderProduct
        ], 200);
    }


    public function destroy(Request $request)
    {
        $product = PreOrderProducts::find($request->id);
        $product->delete();

        return response()->json([
            'message' => 'Product Deleted Successfully'
        ], 200);
    }
}
