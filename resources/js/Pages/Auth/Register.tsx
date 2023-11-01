import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        empno: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="新規登録" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="id" value="ID" />

                    <TextInput
                        id="id"
                        type="text"
                        name="id"
                        value={data.id}
                        className="mt-1 block w-full"
                        autoComplete="id"
                        isFocused={true}
                        onChange={(e) => setData('id', e.target.value)}
                        required
                    />

                    <InputError message={errors.id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="empno" value="empno　※半角数字4桁" />

                    <TextInput
                        id="empno"
                        type="text"
                        name="empno"
                        value={data.empno}
                        className="mt-1 block w-full"
                        autoComplete="empno"
                        isFocused={true}
                        onChange={(e) => setData('empno', e.target.value)}
                        required
                    />

                    <InputError message={errors.empno} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード　※半角英数字のみ8桁以上" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="パスワード（確認用）" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        登録済みの方はこちら
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        新規登録
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
