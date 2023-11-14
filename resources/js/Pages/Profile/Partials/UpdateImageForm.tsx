import PrimaryButton from '@/Components/PrimaryButton';
import InputImage from '@/Components/InputImage';
import { useGetImageUrl } from "@/hooks/useGetImageUrl";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler, useState, useRef } from 'react';
import { PageProps } from '@/types';

const image1: string = "image1";
const image2: string = "image2";

export default function UpdateImage({className = ''}: {className?: string}) {
    // ログインユーザー情報
    const user = usePage<PageProps>().props.auth.user;
    // 画像ファイル取得・更新関数
    const [img1, setImg1] = useState<string | null>(user.img1);
    const [img2, setImg2] = useState<string | null>(user.img2);
    const [imageFile1, setImageFile1] = useState<File | null>(null);
    const [imageFile2, setImageFile2] = useState<File | null>(null);

    /**
     * 画像更新
     * @param e イベント情報
     */
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('UpdateImage');

        // patch(route('profile.update'));
    };

        // 画像プレビューフィールド
        const fileInputRef1 = useRef<HTMLInputElement>(null);
        const fileInputRef2 = useRef<HTMLInputElement>(null);

    /**
     * 更新画像選択
     * @param e イベント情報
     * @param selected 画像番号
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, selected: string) => {
        if (e.currentTarget?.files && e.currentTarget.files[0]) {
            const targetFile = e.currentTarget.files[0];
            if (selected == image1) {
                setImageFile1(targetFile);
            } else {
                setImageFile2(targetFile);
            }
        }
    };

    /**
     * 画像が選択されたら、画像URLを作成
     * @param file 選択された画像情報
     */
    const { imageUrl1 } = useGetImageUrl({ file: imageFile1 }, image1);
    const { imageUrl2 } = useGetImageUrl({ file: imageFile2 }, image2);

    /**
     * 選択した画像をキャンセルしたらプレビュー削除
     * @param selected 画像番号
     */
    const handleClickCancelButton = (selected: string) => {
        console.log(selected);
        if (selected == image1) {
            setImageFile1(null);
            // <input />タグの値をリセット
            if (fileInputRef1.current) {
                fileInputRef1.current.value = "";
            }
        } else {
            setImageFile2(null);
            // <input />タグの値をリセット
            if (fileInputRef2.current) {
                fileInputRef2.current.value = "";
            }
        }
    };

    return (
        <section className={className}>
            <header>
                <p className="mt-1 text-sm text-gray-600">
                    画像を変更することができます
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="all-image-area">
                    <div className="single-image-area">
                        {img1 ? (
                            <div>
                                <img src={img1} />
                            </div>
                        ) : (
                            <div>
                                <img src="https://mag.sendenkaigi.com/brain/201403/images/116_01.jpg" />
                            </div>
                        )}
                        <InputImage ref={fileInputRef1} id="image1" imageUrl={imageUrl1} onChange={(e) => handleFileChange(e, image1)} onClick={() => handleClickCancelButton(image1)} />
                    </div>
                    <div className="single-image-area ml-5">
                        {img2 ? (
                            <div>
                                <img src={img2} />
                            </div>
                        ) : (
                            <div>
                                <img src="https://mag.sendenkaigi.com/brain/201403/images/116_01.jpg" />
                            </div>
                        )}
                        <InputImage ref={fileInputRef2} id="image2" imageUrl={imageUrl2} onChange={(e) => handleFileChange(e, image2)} onClick={() => handleClickCancelButton(image2)} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton>更新</PrimaryButton>

                    {/* <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">更新しました</p>
                    </Transition> */}
                </div>
            </form>
        </section>
    );
}
