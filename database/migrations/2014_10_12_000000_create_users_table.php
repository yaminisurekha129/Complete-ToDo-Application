<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            // $table->string('name');
            $table->string('name')->nullable()->change();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps(); 
           
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users',function(Blueprint $table){
            $table->string('name')->nullable(false)->change();
        });
        
    }
};
