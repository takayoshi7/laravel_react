<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AuthorityRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('authority_role')->insert([
            [
                'id' => '1',
                'authority_id' => '1',
                'role_id' => '1',
            ],
            [
                'id' => '2',
                'authority_id' => '2',
                'role_id' => '1',
            ],
            [
                'id' => '3',
                'authority_id' => '3',
                'role_id' => '1',
            ],
            [
                'id' => '4',
                'authority_id' => '4',
                'role_id' => '1',
            ],
            [
                'id' => '5',
                'authority_id' => '1',
                'role_id' => '2',
            ],
            [
                'id' => '6',
                'authority_id' => '3',
                'role_id' => '2',
            ],
            [
                'id' => '7',
                'authority_id' => '1',
                'role_id' => '3',
            ],
            [
                'id' => '8',
                'authority_id' => '2',
                'role_id' => '3',
            ],
            [
                'id' => '9',
                'authority_id' => '3',
                'role_id' => '3',
            ],
            [
                'id' => '10',
                'authority_id' => '5',
                'role_id' => '1',
            ],
        ]);
    }
}
