<?php

return [
    "activation"                    =>    false,
    "active_on_product"             =>    true,
    "active_on_collection"          =>    false,
    "when_show_preorder"            =>    2,
    "specific_inventory"            =>    0,
    "button_settings"               =>    [
        "inherit_from_theme"        =>    true,
        "settings"                  =>    null
    ],
    "limit"                         =>    "no-limit",
    "schedule"                      =>    [
        "start_date"                =>    null,
        "end_date"                  =>    null,
        "no_end_date"               =>    1,
        "estimated_restock_date"    =>    null,
        "no_restock_date"           =>    1
    ],
    "display_message"               => [
        'message'                   => 'Stock will be available soon.',
        'position'                  => 'before-preorder-button',
        'alignment'                 => 'left'
    ],
    "badge_design"                  => [
        'text'                      => 'Pre Order',
        'position'                  => 'top-right',
        'bg_color'                  => '#000000',
        'text_color'                => '#ffffff',
        'font_size'                 => 16
    ]
];
