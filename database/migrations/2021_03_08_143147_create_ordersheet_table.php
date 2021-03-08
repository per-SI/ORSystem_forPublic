<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersheetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_sheet', function (Blueprint $table) {
            $table->integer('code');
            $table->primary('code');
            $table->dateTime('date');
            $table->integer('order_staff');
            $table->integer('order_shop');
            $table->string('delivery_method',10);
            $table->date('delivery_date');
            $table->date('deadline');
            $table->text('note');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ordersheet');
    }
}
