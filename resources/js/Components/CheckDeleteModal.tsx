import React, { useState, useEffect } from 'react'
import { Emp } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const CheckDeleteModal = (props: { empRow: Emp | null; close: () => void; onClick: (arg0: string) => void; }) => {
    if (!props.empRow) return;

    // 削除したいレコード情報を代入
    const empRow: Emp = props.empRow;

    const [ empno, setEmpno ] = useState<string>('');
    const [ ename, setEname ] = useState<string>('');

    useEffect(() => {
        if (empRow) {
            setEmpno(empRow.empno);
            setEname(empRow.ename);
        }
    },[])

    return (
        <>
            <p className="block font-medium text-lg text-gray-700 mt-5 ml-5 mb-5">このレコードを削除してよろしいですか</p>
            <table className="delete-emp">
                <thead>
                    <tr>
                        <th>社員コード</th>
                        <th>社員名</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{empno}</td>
                        <td>{ename}</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex float-right space-x-5 mt-5 mr-5 mb-5">
                <SecondaryButton onClick={() => props.close()}>キャンセル</SecondaryButton>
                <PrimaryButton onClick={() => props.onClick(empno)}>削　除</PrimaryButton>
            </div>
        </>
    )
}

export default CheckDeleteModal