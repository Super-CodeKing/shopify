<?php

namespace App\Repositories;

use App\Models\RequestStock\RequestedProducts;
use App\Models\Url;

class RequestedProductsRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(RequestedProducts::class);
    }

    public function create(array $data): RequestedProducts {
        $url = $this->getFirstWhere('path', $data['path']);
        if(!$url) return $this->model->create($data);
        else return $url;
    }
}