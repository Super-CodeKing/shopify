<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestStockBadgeDesignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_stock_badge_designs', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->string('text')->default('Request Stock');
            $table->string('position')->default('top-right');
            $table->string('bg_color')->default("#000000");
            $table->string('text_color')->default("#ffffff");
            $table->integer('font_size')->default(16);
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
        Schema::dropIfExists('request_stock_badge_designs');
    }
}
