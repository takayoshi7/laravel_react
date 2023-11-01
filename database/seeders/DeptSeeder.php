<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DeptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dept')->insert([
            [
                'deptno' => '10',
                'dname' => '経理',
                'loc' => '東京',
                'sort' => '1',
            ],
            [
                'deptno' => '20',
                'dname' => '総務',
                'loc' => '東京',
                'sort' => '2',
            ],
            [
                'deptno' => '30',
                'dname' => '営業１部',
                'loc' => '東京',
                'sort' => '3',
            ],
            [
                'deptno' => '40',
                'dname' => '営業２部',
                'loc' => '大阪',
                'sort' => '4',
            ],
            [
                'deptno' => '50',
                'dname' => '技術１部',
                'loc' => '東京',
                'sort' => '5',
            ],
            [
                'deptno' => '60',
                'dname' => '技術２部',
                'loc' => '岩手',
                'sort' => '6',
            ],
        ]);
    }
}
