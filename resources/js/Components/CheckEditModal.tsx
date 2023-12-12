import React, { useState } from 'react'
import { Emp, Dept, Roles } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SelectDateBox from '@/Components/SelectDateBox';
import SelectDeptBox from '@/Components/SelectDeptBox';
import SelectRolesBox from '@/Components/SelectRolesBox';
import Modal from '@/Components/Modal';

const CheckEditModal = (props: { empRow: Emp | null; deptList: Dept; rolesList: Roles; onClick: (editData: Emp) => void; close: () => void; }) => {
    if (!props.empRow) return;

    // 編集したいレコード情報を代入(値がnullなら空文字)
    const empRow: Emp  = {
        id: props.empRow.id,
        empno: props.empRow.empno,
        ename: props.empRow.ename ? props.empRow.ename : "",
        job: props.empRow.job ? props.empRow.job : "",
        mgr: props.empRow.mgr ? props.empRow.mgr : "",
        hiredate: props.empRow.hiredate ? props.empRow.hiredate : "",
        sal: props.empRow.sal ? props.empRow.sal : "",
        comm: props.empRow.comm ? props.empRow.comm : "",
        deptno: props.empRow.deptno ? props.empRow.deptno : "",
        rname: props.empRow.rname ? props.empRow.rname : "",
    };

    // リセット用レコード情報ディープコピー
    const copyEmpRow: Emp  = JSON.parse(JSON.stringify(empRow));;

    // 各項目の入力欄の値
    const [ empData, setEmpData ] = useState({
        id: empRow.id,
        empno: empRow.empno,
        ename: empRow.ename,
        job: empRow.job,
        mgr: empRow.mgr,
        hiredate: empRow.hiredate,
        sal: empRow.sal,
        comm: empRow.comm,
        deptno: empRow.deptno,
        rname: empRow.rname,
    });

    const [ enameError, setEnameError ]       = useState("");    // 社員名入力欄エラー
    const [ hireDateModal, setHireDateModal ] = useState(false); // 生年月日選択モーダル表示可否

    /**
     * 入力欄への入力
    */
    const handleEdit = (e: { target: { name: string; value: string; }; }) => {
        setEmpData((prev) => ({ ...prev, [e.target.name]: e.target.value.replace(/^\s+/,"") }));
    };

    /**
     * レコード更新前バリデーション
     * @param empData 更新したい情報
    */
    const inputVallidation = (empData: Emp) => {
        if (!empData.ename) {
            setEnameError('必須です');
        } else {
            setEnameError('');
        }

        // エラーがなければ更新
        if (empData.ename) {
            props.onClick(empData);
        }
    }

    /**
     * 各入力欄を初期値にリセット
    */
    const formReset = () => {
        setEmpData(copyEmpRow);
        setEnameError('');
    }

    /**
     * 生年月日選択用モーダル表示
    */
    const selectHireDateModalOpen = () => {
        setHireDateModal(true);
    }

    /**
     * 選択した生年月日を入力欄にセット
     * @param date 生年月日
    */
    const setHireDate = (date: string) => {
        empData.hiredate = date;
    };

    /**
     * モーダルを閉じる
     */
    const closeModal = () => {
        setHireDateModal(false);
    };    

    return (
        <>
            <div className="flex">
                <table className="edit-emp w-80 mt-5 ml-3 mr-5">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th className="w-40">ユーザーID</th>
                            <th className="w-40">社員コード</th>
                        </tr>
                        <tr>
                            <td className="bg-slate-100">{empData.id}</td>
                            <td className="bg-slate-100">{empData.empno}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <p className="font-medium text-lg text-gray-700 mt-5">
                        こちらの従業員情報を変更します
                    </p>
                    <p className="font-medium text-lg text-gray-700">
                        変更したい項目を編集し、更新ボタンをクリックしてください
                    </p>
                    <p className="font-small text-gray-700">
                        <span className="text-red-500">* </span>は必須項目です
                    </p>
                </div>
            </div>
            <SecondaryButton className="float-right h-7 mr-5 pr-1 pl-1" onClick={formReset}>リセット</SecondaryButton>

            <table className="edit-emp">
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>社員名<span className="text-red-500">*</span></th>
                        <th>職種</th>
                        <th>上司コード</th>
                        <th>入社日</th>
                    </tr>
                    <tr>
                        <td>
                            <TextInput
                                value={empData.ename}
                                name="ename"
                                onChange={handleEdit}
                                required
                                autoComplete="ename"
                                className="border-0 text-center"
                            />
                            <InputError message={enameError} />
                        </td>
                        <td>
                            <TextInput
                                value={empData.job}
                                name="job"
                                onChange={handleEdit}
                                autoComplete="job"
                                className="border-0 text-center"
                            />
                        </td>
                        <td>
                            <TextInput
                                value={empData.mgr}
                                name="mgr"
                                onChange={handleEdit}
                                autoComplete="mgr"
                                className="border-0 text-center"
                            />
                        </td>
                        <td>
                            <TextInput
                                value={empData.hiredate}
                                name="hiredate"
                                onChange={handleEdit}
                                autoComplete="hiredate"
                                className="border-0 text-center w-44"
                                onClick={selectHireDateModalOpen}
                            />
                            <Modal show={hireDateModal} onClose={closeModal} maxWidth={'sm'}>
                                <SelectDateBox date={empData.hiredate} onChange={setHireDate} />
                            </Modal>
                        </td>
                    </tr>
                    <tr>
                        <th>給与</th>
                        <th>歩合</th>
                        <th>部署コード<span className="text-red-500">*</span></th>
                        <th>役割<span className="text-red-500">*</span></th>
                    </tr>
                    <tr>
                        <td>
                            <TextInput
                                value={empData.sal}
                                name="sal"
                                onChange={handleEdit}
                                autoComplete="sal"
                                className="border-0 text-center"
                            />
                        </td>
                        <td>
                            <TextInput
                                value={empData.comm}
                                name="comm"
                                onChange={handleEdit}
                                autoComplete="comm"
                                className="border-0 text-center"
                            />
                        </td>
                        <td>
                            <SelectDeptBox list={props.deptList} name="deptno" value={empData.deptno} onChange={handleEdit} />
                        </td>
                        <td>
                            <SelectRolesBox list={props.rolesList} name="rname" value={empData.rname} onChange={handleEdit} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex float-right space-x-5 mt-5 mr-5 mb-5">
                <SecondaryButton onClick={() => props.close()}>キャンセル</SecondaryButton>
                <PrimaryButton onClick={() => inputVallidation(empData)}>更　新</PrimaryButton>
            </div>
        </>
    )
}

export default CheckEditModal