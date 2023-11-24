<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Emp;

class EmployerController extends Controller
{
    // 従業員一覧ページ表示
    public function employer(Request $request): Response
    {
        return Inertia::render('Employer', [
            'empData' => Emp::select('emp.id', 'empno', 'ename', 'job', 'mgr', 'hiredate', 'sal',
                                    'comm', 'deptno', 'img1', 'img2', 'roles.name')
                            ->join('roles', 'emp.role', '=', 'roles.id')
                            ->orderby('emp.id', 'asc')
                            ->paginate(),
        ]);
    }

}

