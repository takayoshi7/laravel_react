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
        Schema::create('user_logs', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->string('user_id')->nullable()->comment('ログインユーザー');
            $table->string('ip_address')->nullable()->comment('IPアドレス');
            $table->string('user_agent')->nullable()->comment('ユーザーエージェント');
            $table->string('session_id')->nullable()->comment('セッションID');
            $table->string('access_url')->nullable()->comment('アクセスURL');
            $table->string('operation', 20)->nullable()->comment('操作');
            $table->timestamp('access_time')->nullable()->comment('アクセスタイム');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_logs');
    }
};
