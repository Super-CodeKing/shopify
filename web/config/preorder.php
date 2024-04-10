<?php

return [
    "activation"                        =>    [
        "active"                        =>    true,
        "active_on_product"             =>    true,
        "active_on_collection"          =>    false,
        "when_show_pre_order"           =>    2,
        "specific_inventory"            =>    0
    ],
    "button_settings"                   =>    [
        "inherit_from_theme"            =>    true,
        "settings"                      =>    [
            "button_text"               =>    "Pre Order",
            "button_bg_color"           =>    "#0E0101",
            "button_bg_hover_color"     =>    "#0E0101",
            "button_text_color"         =>    "#F9F9F9",
            "button_text_hover_color"   =>    "#F9F9F9",
            "button_border_color"       =>    "#0E0101",
            "button_border_hover_color" =>    "#0E0101",
            "button_border_width"       =>    0,
            "button_height"             =>    50,
            "button_width"              =>    345,
            "button_border_radius"      =>    0,
            "button_font_size"          =>    24
        ]
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
