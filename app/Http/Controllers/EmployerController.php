<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Emp;
use App\Models\Dept;
use App\Models\Roles;

class EmployerController extends Controller
{
    // 従業員一覧ページ表示
    public function employer(Request $request): Response
    {
        return Inertia::render('Employer', [
            'empData' => Emp::select('emp.id', 'empno', 'ename', 'job', 'mgr', 'hiredate', 'sal',
                                    'comm', 'deptno', 'img1', 'img2', 'roles.rname')
                            ->join('roles', 'emp.role', '=', 'roles.id')
                            ->orderby('emp.id', 'asc')
                            ->paginate(),
            'deptData' => Dept::all(),
            'rolesData' => Roles::all(),
        ]);
    }

    // 画像変更
    public function uploadTableImage(Request $request) {
        $empno = $request->empno;

        if ($request->file1) {
            // formDataからfile1を取り出す
            $image1 = $request->file1;
            // ファイルを文字列とする
            $image1 = file_get_contents($image1);

            // ファイルをbase64でエンコード
            $image1 = base64_encode($image1);

            // empテーブルのimg1カラムに格納
            Emp::where('empno', $empno)->update(['img1' => $image1]);

            $newData = Emp::all();

            return [
                'message' => 'success',
                'newData' => $newData, 
            ];

        } else if ($request->file2) {
            // formDataからfile2を取り出す  
            $image2 = $request->file('file2');
            // アップロードされたファイル名を取得
            $file_name = $image2->getClientOriginalName();
            // 取得したファイル名でstorageに保存、保存先のパスを返す
            $imagePath = $image2->storeAs('public', $file_name);
            // HTML出力用にパスの修正
            $imagePath = str_replace('public', 'storage', $imagePath);

            // empテーブルのimg2カラムに格納
            Emp::where('empno', $empno)->update(['img2' => $imagePath]);

            $newData = Emp::select('emp.id', 'empno', 'ename', 'job', 'mgr', 'hiredate', 'sal',
                                    'comm', 'deptno', 'img1', 'img2', 'roles.rname')
                            ->join('roles', 'emp.role', '=', 'roles.id')
                            ->get();

            return [
                'message' => 'success',
                'newData' => $newData, 
            ];
        }
    }

    // レコード作成
    public function createTableRow(Request $request) {
        $createData = $request->input('createData');

        Emp::create([
            'id'       => $createData['id'],
            'empno'    => (int)$createData['empno'],
            'ename'    => $createData['ename'],
            'job'      => $createData['job'] ? $createData['job'] : null,
            'mgr'      => $createData['mgr'] ? (int)$createData['mgr'] : null,
            'hiredate' => $createData['hiredate'] ? $createData['hiredate'] : null,
            'sal'      => $createData['sal'] ? (int)$createData['sal'] : null,
            'comm'     => $createData['comm'] ? (int)$createData['comm'] : null,
            'deptno'   => (int)$createData['deptno'],
            'role'     => (int)$createData['rname'],
        ]);

        $newData = Emp::select('emp.id', 'empno', 'ename', 'job', 'mgr', 'hiredate', 'sal',
                                'comm', 'deptno', 'img1', 'img2', 'roles.rname')
                        ->join('roles', 'emp.role', '=', 'roles.id')
                        ->get();

        return [
            'message' => 'success',
            'newData' => $newData, 
        ];
    }

    // レコード更新
    public function uploadTableRow(Request $request) {
        $editData = $request->input('editData');

        $record = Emp::find($editData['id']);
        $record->update([
            'ename'    => $editData['ename'],
            'job'      => $editData['job'] ? $editData['job'] : null,
            'mgr'      => $editData['mgr'] ? (int)$editData['mgr'] : null,
            'hiredate' => $editData['hiredate'] ? $editData['hiredate'] : null,
            'sal'      => $editData['sal'] ? (int)$editData['sal'] : null,
            'comm'     => $editData['comm'] ? (int)$editData['comm'] : null,
            'deptno'   => (int)$editData['deptno'],
            'role'     => (int)$editData['rname'],
        ]);

        $newData = Emp::select('emp.id', 'empno', 'ename', 'job', 'mgr', 'hiredate', 'sal',
                                'comm', 'deptno', 'img1', 'img2', 'roles.rname')
                        ->join('roles', 'emp.role', '=', 'roles.id')
                        ->get();

        return [
            'message' => 'success',
            'newData' => $newData, 
        ];
    }

    // レコード削除
    public function deleteTableRow(Request $request) {
        $empno = $request->input('empno');

        Emp::where('empno', $empno)->delete();

        $newData = Emp::select('emp.id', 'empno', 'ename', 'job', 'mgr', 'hiredate', 'sal',
                                'comm', 'deptno', 'img1', 'img2', 'roles.rname')
                        ->join('roles', 'emp.role', '=', 'roles.id')
                        ->get();

        return [
            'message' => 'success',
            'newData' => $newData, 
        ];
    }
}

