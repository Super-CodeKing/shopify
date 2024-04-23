<?php

use App\Lib\EnsureBilling;

return [
    "app_id" => env('APP_ID', '174755655437027101'),
    "billing" => [
        "required" => false,
        "chargeName" => "My Shopify App One-Time Billing",
        "amount" => 5.0,
        "currencyCode" => "USD",
        "interval" => EnsureBilling::INTERVAL_ONE_TIME,
    ],
];
