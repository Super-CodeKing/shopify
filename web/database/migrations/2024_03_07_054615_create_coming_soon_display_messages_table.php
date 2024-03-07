<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComingSoonDisplayMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coming_soon_display_messages', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->text('message')->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->string('position')->default('before-comingsoon-button');
            $table->string('alignment')->default('left');
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
        Schema::dropIfExists('coming_soon_display_messages');
    }
}
