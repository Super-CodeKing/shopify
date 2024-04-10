<?php

namespace App\Http\Controllers;

use App\Http\Resources\PreOrderLimitResource;
use App\Models\ComingSoon\Badge;
use App\Models\ComingSoon\ColorsNText;
use App\Models\ComingSoon\DisplayMessage;
use App\Models\ComingSoon\Products;
use App\Models\ComingSoon\Schedule;
use App\Models\ComingSoon\Setup;
use App\Models\RequestStock\Activation;
use App\Models\PreOrder\BadgeDesign;
use App\Models\PreOrderColorsNText;
use App\Models\RequestStock\Settings;
use App\Models\PreOrderDisplayMessage;
use App\Models\PreOrderLimit;
use App\Models\PreOrderProducts;
use App\Models\PreOrderSchedule;
use App\Models\PreOrderSetup;
use App\Models\QuickStart;
use App\Models\RequestStock\Badge as RequestStockBadge;
use App\Models\RequestStock\DisplayMessage as RequestStockDisplayMessage;
use App\Models\RequestStock\Products as RequestStockProducts;
use App\Models\RequestStock\Schedule as RequestStockSchedule;
use App\Models\Session;
use Exception;
use Illuminate\Http\Request;
use Shopify\Clients\Graphql;
use Shopify\Clients\Rest;

class StoreFrontController extends Controller
{
    public function getQuickStart(Request $request)
    {
        return response()->json(QuickStart::where('shop', $request->shop)->first());
    }

    public function getProductAvailability(Request $request)
    {
        $preOrder = PreOrderProducts::where([
            'shop' =>  $request->shop,
            'product_id' => $request->product_id
        ])
            ->select('start_date', 'end_date', 'has_end_date', 'restock_date', 'has_restock_date', 'order_limit', 'display_message', 'display_badge')
            ->first();

        if ($preOrder) {
            $settings = $this->getAllSettingsOfPreOrder($request->shop);
            $preOrder['settings'] = $settings;
        }

        $comingSoon = Products::where([
            'shop' =>  $request->shop,
            'product_id' => $request->product_id
        ])->first();

        if ($comingSoon) {
            $settings = $this->getAllSettingsOfComingSoon($request->shop);
            $comingSoon['settings'] = $settings;
        }

        $requestStock = RequestStockProducts::where([
            'shop' =>  $request->shop,
            'product_id' => $request->product_id
        ])->first();

        if ($requestStock) {
            $settings = $this->getAllSettingsOfRequestStock($request->shop);
            $comingSoon['settings'] = $settings;
        }

        return response()->json([
            'pre_order' => $preOrder,
            'coming_soon' => $comingSoon,
            'request_stock' => $requestStock
        ]);
    }

    public function getVariantDetails(Request $request)
    {
        $shop = $request->shop;
        $accessToken = Session::select(['access_token'])->where('shop', $shop)->first()->access_token;
        $client = new Graphql($shop, $accessToken);
        
        $query = <<<QUERY
        query {
            productVariant(id: "gid://shopify/ProductVariant/{$request->id}") {
                title
                displayName
                price
                inventoryQuantity
            }
        }
        QUERY;

        $response = $client->query(["query" => $query]);
        return $response->getDecodedBody()['data']['productVariant'];
    }

    public function getPreOrderDailyLimit(Request $request)
    {
        $shop = $request->shop;
        $accessToken = Session::select(['access_token'])->where('shop', $shop)->first()->access_token;

        $client = new Rest($shop, $accessToken);
        $result = $client->get('orders', [], [
            'tag' => 'PRE_ORDER',
            'status' => 'any'
        ]);

        return response($result->getDecodedBody());
    }

    public function getPreOrderTotalLimit(Request $request)
    {
        $shop = $request->shop;
        $accessToken = Session::select(['access_token'])->where('shop', $shop)->first()->access_token;

        $client = new Rest($shop, $accessToken);
        $result = $client->get('orders', [], [
            'tag' => 'PRE_ORDER',
            'status' => 'any'
        ]);

        return response($result->getDecodedBody());
    }

    private function getAllSettingsOfRequestStock($shop)
    {
        $activation = Activation::where('shop', $shop)->first();
        $colorAndText = Settings::where('shop', $shop)->first();
        $schedule = RequestStockSchedule::where('shop', $shop)->first();
        $displayMessage = RequestStockDisplayMessage::where('shop', $shop)->first();
        $badgeDesign = RequestStockBadge::where('shop', $shop)->first();

        return [
            'activation'        => $activation,
            'color'             => $colorAndText,
            'schedule'          => $schedule,
            'display_message'   => $displayMessage,
            'badge_design'      => $badgeDesign
        ];
    }

    private function getAllSettingsOfComingSoon($shop)
    {
        $activation = Setup::where('shop', $shop)->first();
        $colorAndText = ColorsNText::where('shop', $shop)->first();
        $schedule = Schedule::where('shop', $shop)->first();
        $displayMessage = DisplayMessage::where('shop', $shop)->first();
        $badgeDesign = Badge::where('shop', $shop)->first();

        return [
            'activation'        => $activation,
            'color'             => $colorAndText,
            'schedule'          => $schedule,
            'display_message'   => $displayMessage,
            'badge_design'      => $badgeDesign
        ];
    }

    private function getAllSettingsOfPreOrder($shop)
    {
        $activation = PreOrderSetup::where('shop', $shop)
            ->select('active', 'active_on_product', 'active_on_collection', 'when_show_pre_order', 'specific_inventory')
            ->first();

        $colorAndText = PreOrderColorsNText::where('shop', $shop)
            ->select('inherit_from_theme', 'settings')
            ->first();

        $orderLimit = $this->formatOrderLimit(PreOrderLimit::where('shop', $shop)
            ->select('limit')
            ->first());

        $schedule = PreOrderSchedule::where('shop', $shop)
            ->select('start_date', 'end_date', 'no_end_date', 'estimated_restock_date', 'no_restock_date')
            ->first();

        $displayMessage = PreOrderDisplayMessage::where('shop', $shop)
            ->select('message', 'position', 'alignment')
            ->first();

        $badgeDesign = BadgeDesign::where('shop', $shop)
            ->select('text', 'position', 'bg_color', 'text_color', 'font_size')
            ->first();

        return [
            'activation'        => $activation,
            'color'             => $colorAndText,
            'order_limit'       => $orderLimit,
            'schedule'          => $schedule,
            'display_message'   => $displayMessage,
            'badge_design'      => $badgeDesign
        ];
    }

    private function formatOrderLimit($data)
    {
        $type = json_decode($data->limit, true);
        return $type;
    }

    private static function requestProductVariant($request)
    {
        return self::queryOrException(
            $request,
            [
                "query" => self::PRODUCT_VARIANT_DETAILS,
                "variables" => ["id" => "gid://shopify/ProductVariant/" . $request->id]
            ]
        );
    }

    private static function queryOrException($request, $query): array
    {
        $shop = $request->shop;

        $accessToken = Session::select(['access_token'])->where('shop', $shop)->first()->access_token;
        $client = new Graphql($shop, $accessToken);

        $response = $client->query($query);
        $responseBody = $response->getDecodedBody();

        if (!empty($responseBody["errors"])) {
            print_r($responseBody["errors"]);
            throw new Exception("Something Went Wrong", 500);
        }

        return $responseBody;
    }

    private const PRODUCT_VARIANT_DETAILS = <<<'QUERY'
    query productVariant($id: String) {
        title
    }
    QUERY;
}
