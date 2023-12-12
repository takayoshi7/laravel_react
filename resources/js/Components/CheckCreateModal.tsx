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

const CheckCreateModal = (props: { deptList: Dept; rolesList: Roles; onClick: (createData: Emp) => void; close: () => void; }) => {

    // 初期値は空で作成
    const empRow: Emp = {
        id: "",
        empno: "",
        ename: "",
        job: "",
        mgr: "",
        hiredate: "",
        sal: "",
        comm: "",
        deptno: "10",
        rname: "役員",
    };

    // リセット用レコード情報ディープコピー
    const initEmpDate: Emp  = JSON.parse(JSON.stringify(empRow));;

    // 各項目の入力欄の値
    const [ empData, setEmpData ] = useState(empRow);

    const [ hireDateModal, setHireDateModal ] = useState(false); // 生年月日選択モーダル表示可否
    const [ idError, setIdError ]             = useState("");    // ユーザーID入力欄エラー
    const [ empnoError, setEmpnoError ]       = useState("");    // 社員コード入力欄エラー
    const [ enameError, setEnameError ]       = useState("");    // 社員名入力欄エラー

    /**
     * 入力欄への入力
    */
    const handleEdit = (e: { target: { name: string; value: string; }; }) => {
        setEmpData((prev) => ({ ...prev, [e.target.name]: e.target.value.replace(/^\s+/,"") }));
    };

    /**
     * レコード作成前バリデーション
     * @param empData 作成したい情報
    */
    const inputVallidation = (empData: Emp) => {
        if (!empData.id) {
            setIdError('必須です');
        } else {
            setIdError('');
        }

        if (!empData.empno) {
            setEmpnoError('必須です');
        } else {
            setEmpnoError('');
        }

        if (!empData.ename) {
            setEnameError('必須です');
        } else {
            setEnameError('');
        }

        // エラーがなければ作成
        if (empData.id && empData.empno && empData.ename) {
            props.onClick(empData);
        }
    }

    /**
     * 各入力欄を初期値にリセット
    */
    const formReset = () => {
        setEmpData(initEmpDate);
        setIdError('');
        setEmpnoError('');
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
            <div>
                <p className="font-medium text-lg text-gray-700 mt-5 ml-3">
                    各項目に入力し、作成ボタンをクリックしてください
                </p>
                <p className="font-small text-gray-700 ml-3">
                    <span className="text-red-500">* </span>は必須項目です
                </p>
            </div>
            <SecondaryButton className="float-right h-7 mr-5 pr-1 pl-1" onClick={formReset}>リセット</SecondaryButton>

            <table className="create-emp">
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>ユーザーID<span className="text-red-500">*</span></th>
                        <th>社員コード<span className="text-red-500">*</span></th>
                        <th>社員名<span className="text-red-500">*</span></th>
                        <th>職種</th>
                        <th>上司コード</th>
                    </tr>
                    <tr>
                        <td>
                            <TextInput
                                value={empData.id}
                                name="id"
                                onChange={handleEdit}
                                required
                                autoComplete="id"
                                className="border-0 text-center"
                            />
                            <InputError message={idError} />
                        </td>
                        <td>
                            <TextInput
                                value={empData.empno}
                                name="empno"
                                onChange={handleEdit}
                                required
                                autoComplete="empno"
                                className="border-0 text-center"
                            />
                            <InputError message={empnoError} />
                        </td>
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
                    </tr>
                    <tr>
                        <th>入社日</th>
                        <th>給与</th>
                        <th>歩合</th>
                        <th>部署コード<span className="text-red-500">*</span></th>
                        <th>役割<span className="text-red-500">*</span></th>
                    </tr>
                    <tr>
                        <td>
                            <TextInput
                                value={empData.hiredate}
                                name="hiredate"
                                onChange={handleEdit}
                                autoComplete="hiredate"
                                className="border-0 text-center"
                                onClick={selectHireDateModalOpen}
                            />
                            <Modal show={hireDateModal} onClose={closeModal} maxWidth={'sm'}>
                                <SelectDateBox date={empData.hiredate} onChange={setHireDate} />
                            </Modal>
                        </td>
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

export default CheckCreateModal