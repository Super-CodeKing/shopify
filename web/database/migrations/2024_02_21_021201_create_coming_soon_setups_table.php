<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComingSoonSetupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coming_soon_setups', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->boolean('active')->default(true);
            $table->boolean('active_on_product')->default(true);
            $table->boolean('active_on_collection')->default(false);
            $table->tinyInteger('when_show_coming_soon')->default(2);
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
        Schema::dropIfExists('coming_soon_setups');
    }
}
