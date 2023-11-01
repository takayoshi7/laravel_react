<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'id' => '1',
                'name' => '管理者',
            ],
            [
                'id' => '10',
                'name' => '役員',
            ],
            [
                'id' => '20',
                'name' => '人事',
            ],
        ]);
    }
}
