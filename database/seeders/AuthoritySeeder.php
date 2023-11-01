<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AuthoritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('authorities')->insert([
            [
                'id' => '1',
                'name' => '顧客閲覧',
            ],
            [
                'id' => '2',
                'name' => '顧客編集',
            ],
            [
                'id' => '3',
                'name' => '部署閲覧',
            ],
            [
                'id' => '4',
                'name' => '部署編集',
            ],
        ]);
    }
}
