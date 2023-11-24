// 型定義ファイル

// ユーザー情報
export interface User {
    map(arg0: (value: User) => import("react/jsx-runtime").JSX.Element): any;
    id: string;
    email: string;
    email_verified_at: string;
    empno: number;
    ename: string;
    job: string;
    mgr: number;
    hiredate: string;
    sal: number;
    comm: number;
    deptno: number;
    img1: string;
    img2: string;
    name: string;
    post_code: number;
    address1: string;
    address2: string;
    phone_number: number;
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