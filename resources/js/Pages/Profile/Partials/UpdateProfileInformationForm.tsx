import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SelectAddressModal from '@/Components/SelectAddressModal';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useEffect, FormEventHandler } from 'react';
import { PageProps, addresses } from '@/types';
import axios from "axios";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    // ログインユーザー情報
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
    const [ getAddressError, setGetAddressError ] = useState('');                 // 住所未取得エラー
    const [ confirmingAddress, setConfirmingAddress ] = useState(false);          // 住所選択モーダル表示可否
    const [ selectAddress, setSelectAddress ] = useState<addresses | null>(null); // 選択した住所情報
    const [ selectAddressError, setSelectAddressError ] = useState('');           // 住所未選択エラー

    // 住所未取得エラー表示時、郵便番号欄を空欄にしたらエラーを消す
    useEffect(() => {
        if (data.post_code == '') {
            setGetAddressError('');
        }
    }, [data.post_code])

    /**
     * フォームデータを送信してDB更新
     * @param e イベント
     */
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update', data));
    };

    /**
     * 郵便番号から住所取得
     */
    const getAddress = () => {
        axios
            .post('/getAddress', { changePostCode: data.post_code })
            .then((res) => {
                if (res.data.length == 1) {
                    setData({ ...data, address1: res.data[0].pref + res.data[0].city + res.data[0].town, post_code: res.data[0].zip });
                    setGetAddressError('');
                } else if (res.data.length > 1) {
                    setConfirmingAddress(true);
                    setSelectAddress(res.data);
                    setGetAddressError('');
                } else {
                    setGetAddressError(res.data.message);
                    setData('address1', '');
                }
            })
            .catch((error) => alert('通信に失敗しました'));
    }

    /**
     * 住所リストから住所を選択したら入力欄に入れる
     * @param address 住所情報
     */
    const click = (address: addresses | null) => {
        if (!address) {
            setSelectAddressError('選択してください')
            return;
        }
        setSelectAddressError('')
        setData({ ...data, address1: address.pref + address.city + address.town, post_code: address.zip });
        closeModal();
    }

    /**
     * モーダルを閉じる
     */
    const closeModal = () => {
        setConfirmingAddress(false);
    };

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
                        <SecondaryButton className="h-7 ml-3 pr-1 pl-1" onClick={getAddress}>住所取得</SecondaryButton>
                        <Modal show={confirmingAddress} onClose={closeModal}>
                            <SelectAddressModal list={selectAddress} error={selectAddressError} onClick={click}></SelectAddressModal>
                        </Modal>
                        <p className="address-error-message">{getAddressError}</p>
                    </div>

                    <TextInput
                        id="post_code"
                        className="mt-1 block w-full"
                        value={data.post_code}
                        onChange={(e) => setData('post_code', e.target.value.replace(/-/g, ""))}
                        autoComplete="post_code"
                        pattern="^\d{7}$"
                    />

                    <InputError className="mt-2" message={errors.post_code} />
                </div>

                <div>
                    <InputLabel htmlFor="address1" value="住所" />

                    <TextInput
                        id="address1"
                        className="mt-1 block w-full"
                        value={data.address1}
                        onChange={(e) => setData('address1', e.target.value)}
                        autoComplete="address1"
                    />

                    <InputError className="mt-2" message={errors.address1} />
                </div>

                <div>
                    <InputLabel htmlFor="address2" value="以降の住所" />

                    <TextInput
                        id="address2"
                        className="mt-1 block w-full"
                        value={data.address2}
                        onChange={(e) => setData('address2', e.target.value)}
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
