<?php

namespace App\Http\Resources;

use App\Models\PreOrderLimit;
use Illuminate\Http\Resources\Json\JsonResource;

class PreOrderLimitResource extends JsonResource
{
    public function __construct(private PreOrderLimit $limit)
    {
        parent::__construct($limit);
    }

    public function toArray($request)
    {
        $data = json_decode($this->limit->limit, true);
        return [
            'type' => $data['type'],
            'daily_limit' => $data['daily_limit'],
            'total_limit' => $data['total_limit']
        ];
    }
}
