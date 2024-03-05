<?php

return [
    "activation"                    =>    false,
    "active_on_product"             =>    false,
    "active_on_collection"          =>    false,
    "when_show_coming_soon"         =>    2,
    "specific_inventory"            =>    0,
    "button_settings"               =>    [
        "inherit_from_theme"        =>    false,
        "settings"                  =>    null
    ],
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
