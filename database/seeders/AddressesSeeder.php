<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AddressesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info("アドレスの作成を開始します...");

        // 実行前に全データ削除
        DB::table('addresses')->truncate();

        $memberSplFileObject = new \SplFileObject(__DIR__ . '/x-ken-all.csv');
        $memberSplFileObject->setFlags(
            \SplFileObject::READ_CSV |
            \SplFileObject::READ_AHEAD |
            \SplFileObject::SKIP_EMPTY |
            \SplFileObject::DROP_NEW_LINE
        );

        foreach ($memberSplFileObject as $key => $row) {
            //excelでcsvを保存するとBOM付きになるので削除する
            if ($key === 0) {
                $row[0] = preg_replace('/^\xEF\xBB\xBF/', '', $row[0]);
            }

            DB::table('addresses')->insert([
                'zip' => trim($row[0]),
                'pref' => trim($row[1]),
                'city' => trim($row[2]),
                'town' => trim($row[3]),
            ]);
        }
        $this->command->info("アドレスを作成しました。");
    }
}
