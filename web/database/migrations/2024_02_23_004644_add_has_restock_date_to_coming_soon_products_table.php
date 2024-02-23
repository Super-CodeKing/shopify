<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHasRestockDateToComingSoonProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('coming_soon_products', function (Blueprint $table) {
            $table->tinyInteger('has_end_date')->default(1)->after('end_date');
            $table->tinyInteger('has_restock_date')->default(1)->after('restock_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('coming_soon_products', function (Blueprint $table) {
            $table->dropColumn('has_end_date');
            $table->dropColumn('has_restock_date');
        });
    }
}
