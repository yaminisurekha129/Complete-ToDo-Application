<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable(); // Add user_id column
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null'); // Foreign key relationship
        });
    }
    
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id'); // Drop the user_id column
        });
    }
    
};
