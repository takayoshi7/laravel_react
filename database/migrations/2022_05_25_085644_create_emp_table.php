<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('emp', function (Blueprint $table) {
            $table->string('id',20)->unique();
            $table->string('password',100)->nullable();
            $table->string('remember_token',100)->nullable();
            $table->string('email',100)->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('empno');
            $table->string('ename',20)->nullable();
            $table->string('job',20)->nullable();
            $table->integer('mgr')->nullable();
            $table->string('hiredate')->nullable();
            $table->integer('sal')->nullable();
            $table->integer('comm')->nullable();
            $table->integer('deptno')->nullable();
            $table->string('img2')->nullable();
            $table->integer('role')->default(2);
            $table->string('post_code',7)->nullable();
            $table->string('address1',100)->nullable();
            $table->string('address2',100)->nullable();
            $table->string('phone_number', 11)->nullable();
            $table->timestamps();
        });

        // 標準だと対応不可なLONGBLOBでのカラム作成
        DB::statement('ALTER TABLE emp ADD img1 LONGBLOB');
        // img1カラムの位置をdeptnoの後に変更
        DB::statement("ALTER TABLE emp MODIFY COLUMN img1 LONGBLOB AFTER deptno");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emp');
    }
};
