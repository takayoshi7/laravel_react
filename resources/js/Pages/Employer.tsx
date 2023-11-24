import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { User, PageProps } from '@/types';
import React, { useState, useEffect} from 'react'

const Employer = ({ auth, empData }: PageProps<{empData: {data: User}}>) => {
    const [empMap, setEmpMap] = useState(empData.data); 
    console.log(empData.data);



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">従業員一覧</h2>}
        >
            <Head title="従業員一覧" />

            <table className="emp-table">
                <thead>
                    <tr>
                        <th>ユーザＩＤ</th>
                        <th>社員コード</th>
                        <th>社員名</th>
                        <th>職種</th>
                        <th>上司コード</th>
                        <th>入社日</th>
                        <th>給与</th>
                        <th>歩合</th>
                        <th>部署コード</th>
                        <th>役割</th>
                    </tr>
                </thead>
                {empMap.map((value) => {
                    return (
                        <tbody key={value.id}>
                            <tr>
                                <td>{value.id}</td>
                                <td>{value.empno}</td>
                                <td>{value.ename}</td>
                                <td>{value.job}</td>
                                <td>{value.mgr}</td>
                                <td>{value.hiredate}</td>
                                <td>{value.sal}</td>
                                <td>{value.comm}</td>
                                <td>{value.deptno}</td>
                                <td>{value.name}</td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </AuthenticatedLayout>
    )
};

export default Employer