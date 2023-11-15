// 型定義ファイル

// ユーザー情報
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

// 住所情報
export type addresses = {
    map(arg0: (value: any) => import("react/jsx-runtime").JSX.Element): unknown;
    id : number;
    zip: string;
    pref: string;
    city: string;
    town: string;
};