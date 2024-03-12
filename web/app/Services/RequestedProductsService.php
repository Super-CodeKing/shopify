<?php

namespace App\Services;

use App\Models\RequestStock\RequestedProducts;
use App\Repositories\RequestedProductsRepository;
use Illuminate\Database\Eloquent\Collection;

class RequestedProductsService
{
    private $take = 0;
    private $skip = 5;
    private $shop = '';

    public function __construct(private RequestedProductsRepository $requestedProductsRepo)
    {
        
    }

    public function setShop($shop)
    {
        $this->shop = $shop;
        return $this;
    }

    public function get($data)
    {
        $this->setLimitOffset($data);
        return response()->json($this->requestedProductsRepo->getByShop($this->shop, $this->skip, $this->take));
    }

    private function setLimitOffset($data)
    {
        $page = $data['page'] ?? 1;
        $skip = ($page - 1) * 5;
        $this->take = $data['take'] ?? 5;
        $this->skip = $skip ?? 0;
    }
}