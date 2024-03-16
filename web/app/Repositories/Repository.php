<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class Repository implements RepositoryInterface
{
    private string $modelClass;
    protected Model $model;

    public function __construct(?string $modelClass = null)
    {
        $this->modelClass = $modelClass ?: self::guessModelClass();
        $this->model = app($this->modelClass);
    }

    private static function guessModelClass(): string
    {
        return preg_replace('/(.+)\\\\Repositories\\\\(.+)Repository$/m', '$1\Models\\\$2', static::class);
    }

    public function getOneById($id): ?Model
    {
        return $this->model->find($id);
    }

    public function getFirstByIdNShop($shop, $id): ?Model
    {
        return $this->model->where('shop', $shop)->first($id);
    }

    public function getByShop($shop)
    {
        return $this->model->where('shop', $shop)->get();
    }

    /** @return Collection|array<Model> */
    public function getByIds(array $ids): Collection
    {
        return $this->model->find($ids);
    }

    /** @return Collection|array<Model> */
    public function getAll(): Collection
    {
        return $this->model->all();
    }

    public function getCount($shop): int {
        return $this->model->where('shop', $shop)->count();
    }

    public function getFirstWhere(...$params): ?Model
    {
        return $this->model->firstWhere(...$params);
    }

    public function getModelClass(): string
    {
        return $this->modelClass;
    }

    public function searchWith($columnName, $searchTerm, $relation): Collection
    {
        return $this->model->where($columnName, 'like', "%$searchTerm%")->with($relation)->get();
    }

    public function search($columnName, $searchTerm): Collection
    {
        return $this->model->where($columnName, 'like', "%$searchTerm%")->get();
    }

    public function sortLatestWith($relation): Collection
    {
        return $this->model->with($relation)->latest()->get();
    }

    public function getAllWithRelationAndPaginaion($relation, $skip = 0, $take = 5)
    {
        return $this->model->with($relation)->skip($skip)->take($take)->get();
    }

    private function getSearchWithCategory($query, $searchText, $searchCategory)
    {
        if($searchCategory == 'product_title') {
            return $query->where('product_title', 'LIKE', "%{$searchText}%");
        } else if($searchCategory == 'customer_name') {
            return $query->where('customer_name', 'LIKE', "%{$searchText}%");
        } else if($searchCategory == 'customer_email') {
            return $query->where('customer_email', 'LIKE', "%{$searchText}%");
        } else if($searchCategory == 'customer_phone') {
            return $query->where('customer_phone', 'LIKE', "%{$searchText}%");
        }
    }
}