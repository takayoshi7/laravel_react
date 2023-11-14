<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * プロフィールページ表示
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * 名前とメールアドレス変更
     */
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

    /**
     * 郵便番号から住所取得
     */
    public function getAddress(Request $request): RedirectResponse
    {
        $searchaddress = DB::table('addresses')->select('*')->where('zip', 'like', "%" . $request->input('changePostCode') . "%")->get();
        var_dump($searchaddress);
        // $encode = json_decode(json_encode($searchaddress), true);

        // if (empty($encode)) {
        //     $data = ['message' => '存在しない郵便番号です'];
        //     return $data;
        // } else {
        //     return $searchaddress;
        // }
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
