<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class EmpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('emp')->insert([
            [
                'id' => '1001yamada',
                'password' => '$2y$10$7BALy2JnxVqZUs/KziRoheI4zjY0SJQ/TOIYmPv9aPC1r.nbcQZJ.',
                'remember_token' => 'vF8OvDN5sxsjxCvIVAkqC7GVYJVmUW23fpKgvMxj56APlt3woxoI6HVNGcVU',
                'email' => '1001yamada@example.com',
                'empno' => '1001',
                'ename' => '山田一郎',
                'job' => '管理',
                'mgr' => '7902',
                'hiredate' => '1980-12-17',
                'sal' => '2975',
                'comm' => NULL,
                'deptno' => '20',
                'role' => '1',
            ],
            [
                'id' => '1002yamada',
                'password' => '$2y$10$VcXz5rntcWd/ShnIXkFFE.ticZi.FHEXysjfcSPi4xYeMVi6DhmZe',
                'remember_token' => 'O5LWiWTvczn0CrYvYktzs30in7ZNk4YmCiy2Xfc4pqj9aOvzHE6HzL5kJUEL',
                'email' => '1002yamada@example.com',
                'empno' => '1002',
                'ename' => '山田次郎',
                'job' => '管理',
                'mgr' => '7698',
                'hiredate' => '1983-01-23',
                'sal' => '2450',
                'comm' => NULL,
                'deptno' => '30',
                'role' => '10',
            ],
            [
                'id' => '1003yamada',
                'password' => '$2y$10$qnwjIkz1FueXnhhZJbT7NeDYvyXYiAPtcwSWeXTKkEe497lkjcA..',
                'remember_token' => 'fyrhkYoxJ5CXFeMdhLjDI408oyMysFmwKKXeoO1lKSyRHiXFFmMx8Z0useoB',
                'email' => '1003yamada@example.com',
                'empno' => '1003',
                'ename' => '山田花子',
                'job' => '販売',
                'mgr' => '7698',
                'hiredate' => '1988-06-09',
                'sal' => '800',
                'comm' => '300',
                'deptno' => '30',
                'role' => '20',
            ],
            [
                'id' => '2001yamada',
                'password' => '$2y$10$ujNTh5fpzUM5Ih6ZBFxrxudScm2tY5kUwUkRTbq6HhdURfemMzomy',
                'remember_token' => 'JKP9wXEpzaNQti7SnMnXMgnfjSNERNdtSeG2cKj2ZtElVPKho6k7qa1K9oFI',
                'email' => '2001yamada@example.com',
                'empno' => '2001',
                'ename' => '山田太郎',
                'job' => '社長',
                'mgr' => NULL,
                'hiredate' => '1964-05-04',
                'sal' => '5500',
                'comm' => NULL,
                'deptno' => '10',
                'role' => '20',
            ],
            [
                'id' => '2002kawahata',
                'password' => '$2y$10$3HwlFH/i9VlOIRUlRL9xX./MvAOae.RvZYiTr4zrs/gcmO7aCQqPu',
                'remember_token' => NULL,
                'email' => '2002yamada@example.com',
                'empno' => '2002',
                'ename' => '川畑三郎',
                'job' => '開発',
                'mgr' => '7839',
                'hiredate' => '1977-11-12',
                'sal' => '1600',
                'comm' => '500',
                'deptno' => '50',
                'role' => '10',
            ],
            [
                'id' => '2003kawahta',
                'password' => '$2y$10$QkbVwwABmKEOCuRmIjdyI.Ow3vppdvabzCwF0xHn41L/SXXLy7SG.',
                'remember_token' => NULL,
                'email' => '2003yamada@example.com',
                'empno' => '2003',
                'ename' => '川畑雪子',
                'job' => '事務',
                'mgr' => '7839',
                'hiredate' => '1956-02-25',
                'sal' => '1100',
                'comm' => NULL,
                'deptno' => '20',
                'role' => '10',
            ],
            [
                'id' => '2004kawahata',
                'password' => '$2y$10$eLaT8LX2OZUVsmTCKvH41e1J/3Bfwas0trnIBWvCFfRQ6ZpCaPrWW',
                'remember_token' => NULL,
                'email' => '2004yamada@example.com',
                'empno' => '2004',
                'ename' => '川畑太郎',
                'job' => '開発',
                'mgr' => '7566',
                'hiredate' => '1986-05-09',
                'sal' => '1500',
                'comm' => NULL,
                'deptno' => '60',
                'role' => '10',
            ],
            [
                'id' => '3001umino',
                'password' => '$2y$10$ZX3/Rddy67pWYILuIZOV8eW1n1oFMCmB1BTc/Xm9u3ZoGycVIniZC',
                'remember_token' => NULL,
                'email' => '3001umino@example.com',
                'empno' => '3001',
                'ename' => '海野吾朗',
                'job' => '販売',
                'mgr' => '7698',
                'hiredate' => '1983-08-07',
                'sal' => '1100',
                'comm' => '500',
                'deptno' => '30',
                'role' => '10',
            ],
            [
                'id' => '3011yamada',
                'password' => '$2y$10$kurCU8bOqHHC7sUY3Nl4Ge6bE076lbCZU/kXFH9Cc/8a8tXiZpjpC',
                'remember_token' => NULL,
                'email' => '3011yamada@example.com',
                'empno' => '3011',
                'ename' => '山田史郎',
                'job' => '管理',
                'mgr' => '7788',
                'hiredate' => '1970-02-11',
                'sal' => '1500',
                'comm' => '500',
                'deptno' => '20',
                'role' => '10',
            ],
            [
                'id' => '3021yamada',
                'password' => '$2y$10$VW8IAVAczifvqj1YkzGqdeoycuzHeHpDczykUqSsctSjJpdFMUq3i',
                'remember_token' => NULL,
                'email' => '3021yamada@example.com',
                'empno' => '3021',
                'ename' => '山田花子',
                'job' => '事務',
                'mgr' => '7698',
                'hiredate' => '1978-10-26',
                'sal' => '1250',
                'comm' => '300',
                'deptno' => '10',
                'role' => '10',
            ],
            [
                'id' => '4001umino',
                'password' => '$2y$10$OFiDpju9Xo1De3i3hT.UXu9Ez7QTxALwURtB23O.WrQ6Yx9cafVFi',
                'remember_token' => NULL,
                'email' => '4001umino@example.com',
                'empno' => '4001',
                'ename' => '海野月子',
                'job' => '販売',
                'mgr' => '7566',
                'hiredate' => '1975-02-17',
                'sal' => '1250',
                'comm' => NULL,
                'deptno' => '40',
                'role' => '10',
            ],
            [
                'id' => '5001umino',
                'password' => '$2y$10$HVBzh6CdlJ60FyJdDGkKs.Mb28X/dXuHna9WnYh0ignXtuR0QyqKW',
                'remember_token' => NULL,
                'email' => '5001umino@example.com',
                'empno' => '5001',
                'ename' => '海野太郎',
                'job' => '販売',
                'mgr' => '7782',
                'hiredate' => '1988-05-22',
                'sal' => '950',
                'comm' => NULL,
                'deptno' => '40',
                'role' => '10',
            ],
            [
                'id' => '5002umino',
                'password' => '$2y$10$qlTUO5wuh4d2HK2vaJsMve4VwxhTLrMXfrZndC0WrkUeJzi722DMq',
                'remember_token' => NULL,
                'email' => '5002umino@example.com',
                'empno' => '5002',
                'ename' => '海野一郎',
                'job' => '管理',
                'mgr' => '7902',
                'hiredate' => '1978-12-17',
                'sal' => '3000',
                'comm' => NULL,
                'deptno' => '50',
                'role' => '10',
            ],
        ]);
    }
}