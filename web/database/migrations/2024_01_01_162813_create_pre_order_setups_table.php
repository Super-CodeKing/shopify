<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreOrderSetupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pre_order_setups', function (Blueprint $table) {
            $table->id();
            $table->boolean('active')->default(true);
            $table->boolean('active_on_product')->default(true);
            $table->boolean('active_on_collection')->default(false);
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
        Schema::dropIfExists('pre_order_setups');
    }
}
