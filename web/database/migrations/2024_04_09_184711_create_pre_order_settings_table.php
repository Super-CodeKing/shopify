<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreOrderSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('pre_order_settings', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->json('activation')->nullable();
            $table->json('colors')->nullable();
            $table->json('order_limit')->nullable();
            $table->json('schedule')->nullable();
            $table->json('display_message')->nullable();
            $table->json('badge_design')->nullable();
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
        Schema::dropIfExists('pre_order_settings');
    }
}
