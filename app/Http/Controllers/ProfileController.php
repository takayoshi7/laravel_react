<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Emp;

class ProfileController extends Controller
{
    // プロフィールページ表示
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // 名前とメールアドレス変更
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // フォームに入力された値をRequestsのProfileUpdateRequest.phpのルールでバリデートする
        $request->user()->fill($request->validated());

        // メールアドレスの変更があった場合、email_verified_atカラムをnullにする
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // DB更新
        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    // 郵便番号から住所取得
    // Laravel10.1以降は型指定不要
    public function getAddress(Request $request)
    {
        // ヒットした住所を取得
        $searchaddress = DB::table('addresses')->select('*')->where('zip', 'like', "%" . $request->input('changePostCode') . "%")->get();
        // 住所を変換
        $encode = json_decode(json_encode($searchaddress), true);

        // 住所がヒットしなければエラーを返す
        if (empty($encode)) {
            $data = ['message' => '存在しない郵便番号です'];
            return $data;
        } else {
            return $searchaddress;
        }
    }


    // 画像変更
    public function uploadImage(Request $request) {
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

            if ($request->file2) {
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
            } else {
                $imagePath = null;
            }


            return [
                'message' => 'success',
                'data' => [
                    'image1' => $image1, 
                    'image2' => $imagePath,
                ]
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

            return [
                'message' => 'success',
                'data' => [
                    'image2' => $imagePath,
                ]
            ];
        }
    }

    // 画像削除
    public function deleteImage(Request $request) {
        // 削除するempno
        $empno = $request->input('empno');
        // 選択した画像番号
        $select = $request->input('select');
        // 選択した画像がimage1ならimg1を選択。違うならimg2を選択
        $selectImageNum = ($select == "image1") ? "img1" : "img2";

        // 選択した画像のカラムをnullにする
        Emp::where('empno', $empno)->update([$selectImageNum => NULL]);

        return [
            'message' => 'success',
            'select' => $select,
        ];
    }





    /**
     * アカウント削除
     */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }
}
