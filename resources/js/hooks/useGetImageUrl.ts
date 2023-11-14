import { useEffect, useState } from 'react';

type Args = {
    file: File | null;
};

/**
 * 画像が選択されたら、画像URLを作成
 * @param file 画像情報
 * @param selected 画像番号
 */
export const useGetImageUrl = ({ file }: Args, selected: string) => {
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');

    useEffect(() => {
        if (!file) {
            return;
        }

        let reader: FileReader | null = new FileReader();
        reader.onloadend = () => {
            // base64のimageUrlを生成する。
            const base64 = reader && reader.result;
            if (base64 && typeof base64 === 'string') {
                if (selected == 'image1') {
                    setImageUrl1(base64);
                } else {
                    setImageUrl2(base64);
                }
            }
        };
        reader.readAsDataURL(file);

        return () => {
            reader = null;
            if (selected == 'image1') {
                setImageUrl1('');
            } else {
                setImageUrl2('');
            }
        };
    }, [file]);

    return {
        imageUrl1, imageUrl2
    };
};