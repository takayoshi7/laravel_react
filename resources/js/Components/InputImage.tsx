import React, { useState } from "react";
import SecondaryButton from '@/Components/SecondaryButton';
import { useDropzone } from "react-dropzone"; // ドラッグ＆ドロップライブラリ

const FIELD_SIZE = 150; // 画像プレビューフィールド高さ

export type Props = {
    id: string;
    imageUrl: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onDropFiles: (files: File[], id: string) => void;
};

const InputImage = (({id, imageUrl, onClick, onDropFiles}: Props) => {
    const [fileError, setFileError] = useState<string>(''); // 画像エラーメッセージ
    
    //　ファイルのドラッグ＆ドロップ処理
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        // 受け入れられるファイルの種類
        accept: {'image/png': ['.png', '.jpg', '.jpeg']},
        // 最大ファイルサイズ(バイト)
        maxSize: 1048576, // 1MB
        // 複数のファイル許可しない
        multiple: false,
        // ファイルにエラーがない場合にプレビュー実行
        onDropAccepted: (files: File[]) => { onDropFiles(files, id), setFileError('') },
        // ファイルにエラーがあった場合に実行
        onDropRejected: () => { setFileError('ファイルが正しくありません') },
    });

    // ドロップエリアにドラッグしてアクティブになったらエリアの色を変える
    const dropAreaBackground = isDragActive ? 'bg-slate-200' : '';

    return (
        <>
            <div className={`${dropAreaBackground}`}>
                <label {...getRootProps()}
                    htmlFor={id}
                    style={{
                        border: "blue 3px dotted",
                        height: FIELD_SIZE,
                        display: "flex",
                        borderRadius: 12,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: "pointer",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="アップロード画像"
                            style={{ objectFit: "contain", width: "100%", height: "100%" }}
                        />
                    ) : (
                        <p>クリックで画像を選択<br />または<br />ドラッグ＆ドロップで選択</p>
                    )}
                    <input {...getInputProps()} />
                </label>
            </div>

            <div className="mt-5">
                <p className="text-red-500">{fileError}</p>
                <SecondaryButton onClick={onClick}>キャンセル</SecondaryButton>
            </div>
        </>
    );
});

export default InputImage;
