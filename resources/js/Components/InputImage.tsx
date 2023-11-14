import React, { InputHTMLAttributes, forwardRef } from "react";
import SecondaryButton from '@/Components/SecondaryButton';

const FIELD_SIZE = 180; // 画像プレビューフィールドサイズ

export type Props = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    id: InputHTMLAttributes<HTMLInputElement>["id"];
    imageUrl: string;
};

const InputImage = forwardRef<HTMLInputElement, Props>(
    ({ onChange, onClick, id, imageUrl }, ref) => {
        return (
            <>
                <label
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
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                    ) : (
                        "クリックで画像を選択\nまたは\nドラッグ＆ドロップで選択"
                    )}
                    <input
                        ref={ref}
                        id={id}
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                        hidden
                    />
                </label>

                <div className="mt-5">
                    <SecondaryButton onClick={onClick}>キャンセル</SecondaryButton>
                </div>
            </>
        );
    }
);

export default InputImage;
