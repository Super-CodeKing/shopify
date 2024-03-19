<?php

return [
    "active"                        =>    false,
    "active_on_product"             =>    false,
    "active_on_collection"          =>    false,
    "when_show_request_stock"       =>    2,
    "specific_inventory"            =>    0,
    "settings"                      =>    [
        "inherit_from_theme"        =>    true,
        "button"                    =>    null,
        "form"                      =>    null
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
        'position'                  => 'before-requeststock-button',
        'alignment'                 => 'left'
    ],
    "badge_design"                  => [
        'text'                      => 'Request Stock',
        'position'                  => 'top-right',
        'bg_color'                  => '#000000',
        'text_color'                => '#ffffff',
        'font_size'                 => 13
    ]
];
