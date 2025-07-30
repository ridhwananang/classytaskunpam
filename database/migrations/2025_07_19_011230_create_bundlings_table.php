<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bundlings', function (Blueprint $table) {
            $table->id();
            $table->string('no_product_id_second')->nullable();
            $table->string('no_product_id')->nullable();
            $table->string('Nama_Bundling')->nullable();
            $table->string('variasi')->nullable();
            $table->text('Items')->nullable(); // contoh isinya: "parfum a,parfum b,parfum c"
            $table->Integer('count_of_Jumlah')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bundlings');
    }
};
