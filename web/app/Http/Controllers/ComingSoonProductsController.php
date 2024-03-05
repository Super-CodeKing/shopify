<?php

namespace App\Http\Controllers;

use App\Models\ComingSoon\Products;
use Illuminate\Http\Request;

class ComingSoonProductsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $comingSoonProducts = Products::where('shop', $shop)->get();
        return response()->json([
            'data' => $comingSoonProducts
        ], 200);
    }

    public function store(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $comingSoonProductArray = json_decode($request->getContent(), true);
        $makeData = [];

        for($i = 0; $i < count($comingSoonProductArray); $i++) {
            $singleProductData = $comingSoonProductArray[$i];

            $singleProductData['shop']              = $shop;
            $singleProductData['title']             = $singleProductData['title'];
            $singleProductData['start_date']        = $this->formatDate($singleProductData['start_date']);
            $singleProductData['end_date']          = $this->formatDate($singleProductData['end_date']);
            $singleProductData['has_end_date']      = $singleProductData['has_end_date'] == 1 ? 1: 0;
            $singleProductData['restock_date']      = $this->formatDate($singleProductData['restock_date']);
            $singleProductData['has_restock_date']  = $singleProductData['has_restock_date'] == 1 ? 1: 0;
            $singleProductData['display_message']   = $singleProductData['display_message'] == 1 ? 1 : 0;
            $singleProductData['display_badge']     = $singleProductData['display_badge'] == 1 ? 1 : 0;

            array_push($makeData, $singleProductData);
        }

        $result = [];
        foreach ($makeData as $data) {
            $r = Products::create($data);
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
        $restock_date = $request->restock_date != "null" ? date('Y-m-d H:i:s', strtotime($request->restock_date)) : null;

        $hasEndDate = $this->formatFalsyValue($request->has_end_date);
        $hasRestockDate = $this->formatFalsyValue($request->has_restock_date);

        $displayMessage = $request->display_message == 1 ? 1 : 0;
        $displayBadge = $request->display_badge == 1 ? 1 : 0; 

        $preOrderProduct = Products::where('shop', $shop)
            ->where('id', $request->id)
            ->where('product_id', $request->product_id)
            ->update([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'has_end_date' => $hasEndDate,
                'restock_date' => $restock_date,
                'has_restock_date' => $hasRestockDate,
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
        $product = Products::find($request->id);
        $product->delete();

        return response()->json([
            'message' => 'Product Deleted Successfully'
        ], 200);
    }

    private function formatDate($date)
    {
        $formattedDate = '';
        if($date == "null" || $date == NULL) {
            $formattedDate = NULL;
        } else {
            $formattedDate = date('Y-m-d H:i:s', strtotime($date));
        }
        return $formattedDate;
    }

    private function formatFalsyValue($falsyValue)
    {
        $falsyTo_0_1 = 1;
        
        if($falsyValue == "true" || $falsyValue == true || $falsyValue == 1)
        {
            $falsyTo_0_1 =  1;
        }
        else if($falsyValue == "false" || $falsyValue == false || $falsyValue == 0)
        {
            $falsyTo_0_1 = 0;
        }
        
        return $falsyTo_0_1;
    }
}
