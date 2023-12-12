// 型定義ファイル

// ユーザー情報
export interface User {
    email: string;
    email_verified_at: string;
    empno: number | null;
    ename: string;
    img1: string;
    img2: string;
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

// 従業員情報
export interface Emp {
    id: string;
    empno: string;
    ename: string;
    job: string;
    mgr: string;
    hiredate: string;
    sal: string;
    comm: string;
    deptno: string;
    img1?: string;
    img2?: string;
    rname: string;
}

// 部署情報
export interface Dept {
    deptno: string;
    dname: string;
    loc: string;
    sort: string;
}

// 役割情報
export interface Roles {
    length: number;
    id: string;
    rname: string;
}

// 住所情報
export type addresses = {
    id : string;
    zip: string;
    pref: string;
    city: string;
    town: string;
};