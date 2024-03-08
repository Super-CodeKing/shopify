<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestStockSetupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_stock_setups', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->boolean('active')->default(false);
            $table->boolean('active_on_product')->default(true);
            $table->boolean('active_on_collection')->default(false);
            $table->tinyInteger('when_show_request_stock')->default(2);
            $table->integer('specific_inventory')->default(0);
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
        Schema::dropIfExists('request_stock_setups');
    }
}
