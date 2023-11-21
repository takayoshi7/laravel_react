import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputImage from '@/Components/InputImage';
import { useGetImageUrl } from "@/hooks/useGetImageUrl";
import { usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { PageProps } from '@/types';
import axios from "axios";

const image1: string = 'image1';
const image2: string = 'image2';

export default function UpdateImage({className = ''}: {className?: string}) {
    // ログインユーザー情報
    const user = usePage<PageProps>().props.auth.user;
    
    const [img1, setImg1] = useState<string | null>(user.img1);         // 画像1
    const [img2, setImg2] = useState<string | null>(user.img2);         // 画像2
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false); // 更新時文言表示可否
    const [imageFile1, setImageFile1] = useState<File | null>(null);    // プレビュー画像1
    const [imageFile2, setImageFile2] = useState<File | null>(null);    // プレビュー画像2

    /**
     * 画像が選択されたら、画像URLを作成
     * @param file 選択された画像情報
     */
    const { imageUrl1 } = useGetImageUrl({ file: imageFile1 }, image1);
    const { imageUrl2 } = useGetImageUrl({ file: imageFile2 }, image2);

    /**
     * 画像プレビュー
     * @param files 画像情報
     * @param selected 画像番号
     */
    const handleDropFiles = (files: File[], selected: string) => {
        const targetFile = files[0];
        if (selected == image1) {
            setImageFile1(targetFile);
        } else {
            setImageFile2(targetFile);
        }
    }

    /**
     * キャンセルをクリックしたらプレビュー削除
     * @param selected 画像番号
     */
    const handleClickCancelButton = (selected: string) => {
        if (selected == image1) {
            setImageFile1(null);
        } else {
            setImageFile2(null);
        }
    };

    /**
     * 画像更新
     */
    const uploadImage = () => {
        // ヘッダー定義
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        // Formデータ作成
        const formData = new FormData();
        formData.append('empno', String(user.empno));

        // 画像データ追加
        if (imageFile1) {
            formData.append("file1", imageFile1);
            if (imageFile2) {
                formData.append("file2", imageFile2);
            }
        } else if (imageFile2) {
            formData.append("file2", imageFile2);
        } else {
            return;
        }

        axios
            .post('/uploadImage', formData, config)
            .then((res) => {
                // [更新しました]表示
                setUploadSuccess(true);
                // 通信成功したら更新した画像表示を変更
                if (res.data.message == 'success') {
                    if (res.data.data.image1) {
                        setImg1(res.data.data.image1);
                        setImageFile1(null);
                        if (res.data.data.image2 != null) {
                            setImg2(res.data.data.image2);
                            setImageFile2(null);
                        }
                    } else {
                        setImg2(res.data.data.image2);
                        setImageFile2(null);
                    }
                }
                // [更新しました]2秒後に非表示
                setTimeout(() => setUploadSuccess(false), 2000);
            })
            .catch((error) => alert('通信に失敗しました'));
    }

    /**
     * 画像削除
     */
    const deleteImage = (select: string) => {
        const selectData = {
            'empno': String(user.empno),
            'select': select,
        }

        axios
            .post('/deleteImage', selectData)
            .then((res) => {
                if (res.data.message == 'success') {
                    if (res.data.select == image1) {
                        setImg1(null);
                    } else {
                        setImg2(null);
                    }
                }
            })
            .catch((error) => alert('通信に失敗しました'));
        }

    return (
        <section className={className}>
            <header>
                <p className="mt-1 text-sm text-gray-600">
                    画像を変更することができます
                </p>
            </header>

            <form className="mt-6 space-y-6">
                <div className="all-image-area">
                    <div className="single-image-area">
                        {img1 ? (
                            <div className="profileImage">
                                <img src={'data:image/png;base64,' + img1} />
                                <SecondaryButton className="deleteImageButton" onClick={() =>deleteImage(image1)}>削除</SecondaryButton>
                            </div>
                        ) : (
                            <div className="profileImage">
                                <img src="storage/no_image.jpg" />
                            </div>
                        )}
                        <InputImage
                            id={image1}
                            imageUrl={imageUrl1}
                            onClick={() => handleClickCancelButton(image1)}
                            onDropFiles={handleDropFiles}
                        />
                    </div>
                    <div className="single-image-area ml-5">
                        {img2 ? (
                            <div className="profileImage">
                                <img src={img2} />
                                <SecondaryButton className="deleteImageButton" onClick={() =>deleteImage(image2)}>削除</SecondaryButton>
                            </div>
                        ) : (
                            <div className="profileImage">
                                <img src="storage\no_image.jpg" />
                            </div>
                        )}
                        <InputImage
                            id={image2}
                            imageUrl={imageUrl2}
                            onClick={() => handleClickCancelButton(image2)}
                            onDropFiles={handleDropFiles}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton type="button" onClick={uploadImage}>更新</PrimaryButton>

                    <Transition
                        show={uploadSuccess}
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
