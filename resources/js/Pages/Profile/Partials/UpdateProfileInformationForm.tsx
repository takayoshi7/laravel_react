import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import axios from "axios";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    // errors:エラー確認　processing:フォーム送信チェック　recentlySuccessful:一時的な送信成功設定
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        ename: user.ename,
        email: user.email,
        post_code: user.post_code ? user.post_code : "",
        address1: user.address1 ? user.address1 : "",
        address2: user.address2 ? user.address2 : "",
        phone_number: user.phone_number ? user.phone_number : "",
    });

    // console.log(data);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update', data));
    };

    const getAddress = () => {
        axios
        .post('/getAddress', { changePostCode: data.post_code })
        .then((res) => {
            console.log(res);
            // if (res.data.length == 1) {
                // setData('address1', res.data);
                // setData('address2', res.data);
            // } else if (res.data.length > 1) {
            //     selectPostCode(res.data);
            // } else {
            //     alert('ない');
            // }
        })
        .catch((error) => alert("通信に失敗しました"));
    }

    return (
        <section className={className}>
            <header>
                <p className="mt-1 text-sm text-gray-600">
                    登録されているプロフィール情報を変更することができます
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="ename" value="名前" />

                    <TextInput
                        id="ename"
                        className="mt-1 block w-full"
                        value={data.ename}
                        onChange={(e) => setData('ename', e.target.value)}
                        required // 必須チェック
                        isFocused
                        autoComplete="ename"
                    />

                    <InputError className="mt-2" message={errors.ename} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <div className="flex items-end">
                        <InputLabel className="bottom-0" htmlFor="post_code" value="郵便番号" />
                        <SecondaryButton className="h-7 ml-3 pr-1 pl-1 bg-indigo-200" onClick={getAddress}>住所取得</SecondaryButton>
                    </div>

                    <TextInput
                        id="post_code"
                        className="mt-1 block w-full"
                        value={data.post_code}
                        onChange={(e) => setData('post_code', e.target.value.replace(/-/g, ""))}
                        isFocused
                        autoComplete="post_code"
                        pattern="^\d{7}$"
                    />

                    <InputError className="mt-2" message={errors.post_code} />
                </div>

                <div>
                    <InputLabel htmlFor="address1" value="住所1" />

                    <TextInput
                        id="address1"
                        className="mt-1 block w-full"
                        value={data.address1}
                        onChange={(e) => setData('address1', e.target.value)}
                        isFocused
                        autoComplete="address1"
                    />

                    <InputError className="mt-2" message={errors.address1} />
                </div>

                <div>
                    <InputLabel htmlFor="address2" value="住所2" />

                    <TextInput
                        id="address2"
                        className="mt-1 block w-full"
                        value={data.address2}
                        onChange={(e) => setData('address2', e.target.value)}
                        isFocused
                        autoComplete="address2"
                    />

                    <InputError className="mt-2" message={errors.address2} />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="電話番号" />

                    <TextInput
                        id="phone_number"
                        className="mt-1 block w-full"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value.replace(/-/g, ""))}
                        isFocused
                        autoComplete="phone_number"
                        pattern="^\d{10,11}$"
                    />

                    <InputError className="mt-2" message={errors.phone_number} />
                </div>


                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            メール アドレスが認証されていません。
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                ここをクリックして確認メールを再送信してください。
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                新しい確認リンクがあなたのメールアドレスに送信されました。
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {/* disabled={processing} フォームが送信されていればクリックできないように */}
                    <PrimaryButton disabled={processing}>更新</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">更新しました</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
