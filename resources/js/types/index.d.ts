// 型定義ファイル

export interface User {
    id: number;
    ename: string;
    email: string;
    email_verified_at: string;
    post_code: number;
    address1: string;
    address2: string;
    phone_number: number;
    img1: string;
    img2: string;
    role: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
