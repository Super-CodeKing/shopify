<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreOrderProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pre_order_products', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->bigInteger('product_id');
            $table->bigInteger('variant_id')->nullable();
            $table->string('title');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('order_limit')->nullable();
            $table->boolean('display_message')->default(false);
            $table->boolean('display_badge')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pre_order_products');
    }
}
