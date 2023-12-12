import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Emp, Dept, Roles, PageProps } from '@/types';
import React, { useState, useEffect} from 'react'
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import SecondaryButton from '@/Components/SecondaryButton';
import CheckCreateModal from '@/Components/CheckCreateModal';
import CheckEditModal from '@/Components/CheckEditModal';
import CheckDeleteModal from '@/Components/CheckDeleteModal';
import Modal from '@/Components/Modal';
import axios from "axios";

const Employer = ({ auth, empData, deptData, rolesData }: PageProps<{empData: {data: Emp}, deptData: Dept, rolesData: Roles}>) => {
    const [ empList, setEmpList ]                   = useState<Emp[]>([]);        // 表示する従業員テーブル情報
    const [ pageSize, setPageSize ]                 = useState<number>(5);        // 1ページの表示件数
    const [ globalFilter, setGlobalFilter ]         = useState<string>('');       // 絞り込みワード
    const [ confirmingCreate, setConfirmingCreate ] = useState(false);            // レコード作成モーダル表示可否
    const [ confirmingEdit, setConfirmingEdit ]     = useState(false);            // レコード編集モーダル表示可否
    const [ confirmingDelete, setConfirmingDelete ] = useState(false);            // レコード削除確認モーダル表示可否
    const [ selectEmpRow, setselectEmpRow ]         = useState<Emp | null>(null); // 削除するコード情報

    const list: any = empData.data; // 従業員DB情報
    const deptList: Dept = deptData; // 部署DB情報
    const rolesList: Roles = rolesData; // 役割DB情報

    // 初回のみデータを取得してempListに入れる
    useEffect(() => {
        setEmpList(list);
    }, []);

    // テーブルのカラムの型定義
    const columnHelper = createColumnHelper<Emp>();

    /**
     * カラム情報作成
    */
    const columns = [
        columnHelper.accessor('id', {
            header: 'ユーザーID',
            sortDescFirst: true,
        }),
        columnHelper.accessor('empno', {
            header: () => <span>社員<br/>コード</span>,
        }),
        columnHelper.accessor('ename', {
            header: '社員名',
        }),
        columnHelper.accessor('job', {
            header: '職種',
        }),
        columnHelper.accessor('mgr', {
            header: () => <span>上司<br/>コード</span>,
        }),
        columnHelper.accessor('hiredate', {
            header: '入社日',
        }),
        columnHelper.accessor('sal', {
            header: '給与',
        }),
        columnHelper.accessor('comm', {
            header: '歩合',
        }),
        columnHelper.accessor('deptno', {
            header: () => <span>部署<br/>コード</span>,
        }),
        columnHelper.accessor('img1', {
            header: '画像1',
            cell: (props) => (
                props.getValue()
                ? <>
                    <label>
                        <img src={'data:image/png;base64,' + props.getValue()} className="table-image-size" />
                        <input type="file" onChange={(e) => changeImage(e, props.row.original.empno, 'img1')} hidden />
                    </label>
                </>
                : <>
                    <label>
                        <img src={'storage/no_image.jpg'} className="table-image-size" />
                        <input type="file" onChange={(e) => changeImage(e, props.row.original.empno, 'img1')} hidden />
                    </label>
                </>
            ),
            enableSorting : false, // ソート機能を停止
        }),
        columnHelper.accessor('img2', {
            header: '画像2',
            cell: (props) => (
                props.getValue()
                ? <>
                    <label>
                        <img src={props.getValue()} className="table-image-size" />
                        <input type="file" onChange={(e) => changeImage(e, props.row.original.empno, 'img2')} hidden />
                    </label>
                </>
                : <>
                    <label>
                        <img src={'storage/no_image.jpg'} className="table-image-size" />
                        <input type="file" onChange={(e) => changeImage(e, props.row.original.empno, 'img2')} hidden />
                    </label>
                </>
            ),
            enableSorting : false, // ソート機能を停止
        }),
        columnHelper.accessor('rname', {
            header: '役割',
        }),
        columnHelper.display({
            id: 'update',
            header: '編集',
            cell: (props) => (
                <SecondaryButton onClick={()=>editModalOpen(props.row.original)}>
                編集
                </SecondaryButton>
            ),
        }),
        columnHelper.display({
            id: 'delete',
            header: '削除',
            cell: (props) => (
                <SecondaryButton onClick={()=>deleteModalOpen(props.row.original)}>
                削除
                </SecondaryButton>
            ),
        }),
    ];

    /**
     * レコード作成モーダル表示
    */
    const createModalOpen = () => {
        setConfirmingCreate(true);
    };

        /**
     * レコード作成
     * @param createData 作成したい情報
    */
    const createRow = (createData: Emp) => {
        // 選択した役割がrolesテーブルのrnameと一致したらそのidに変換
        Object.values(rolesList).map((element) => {
            if (element.rname == createData.rname) {
                createData.rname = element.id;
            }
        })

        axios
        .post('/createTableRow', {createData: createData})
        .then((res) => {
            // 通信成功したらテーブル更新
            if (res.data.message == 'success') {
                const uploadObj = res.data.newData;
                setEmpList(uploadObj);
                setConfirmingCreate(false);
            }
        })
        .catch((error) => alert('通信に失敗しました'));
    };

    /**
     * レコード編集モーダル表示
     * @param empRow 編集するレコードの情報
    */
    const editModalOpen = (empRow: Emp) => {
        setConfirmingEdit(true);
        setselectEmpRow(empRow);
    };

    /**
     * レコード更新
     * @param editData 更新したい情報
    */
    const editRow = (editData: Emp) => {
        // 選択した役割がrolesテーブルのrnameと一致したらそのidに変換
        Object.values(rolesList).map((element) => {
            if (element.rname == editData.rname) {
                editData.rname = element.id;
            }
        })

        axios
        .post('/uploadTableRow', {editData: editData})
        .then((res) => {
            // 通信成功したらテーブル更新
            if (res.data.message == 'success') {
                const uploadObj = res.data.newData;
                setEmpList(uploadObj);
                setConfirmingEdit(false);
            }
        })
        .catch((error) => alert('通信に失敗しました'));
    };

    /**
     * レコード削除確認モーダル表示
     * @param empRow 削除するレコードの情報
    */
    const deleteModalOpen = (empRow: Emp) => {
        setConfirmingDelete(true);
        setselectEmpRow(empRow);
    };

    /**
     * レコード削除
     * @param empno 削除するレコードの社員コード
    */
    const deleteRow = (empno: string) => {
        if (empno == null) return;
        axios
        .post('/deleteTableRow', {empno: empno})
        .then((res) => {
            // 通信成功したら行削除
            if (res.data.message == 'success') {
                const uploadObj = res.data.newData;
                setEmpList(uploadObj);
                setConfirmingDelete(false);
            }
        })
        .catch((error) => alert('通信に失敗しました'));
    };

    /**
     * モーダルを閉じる
     */
    const closeModal = () => {
        setConfirmingCreate(false);
        setConfirmingEdit(false);
        setConfirmingDelete(false);
    };

    /**
     * 画像更新
     * @param event イベント
     * @param empno 更新するレコードの社員コード
     * @param select 更新する画像の番号
    */
    const changeImage = (event: React.ChangeEvent<HTMLInputElement>, empno: string, select: string) => {
        if (event.target.files) {
            const file: File = event.target.files[0];

            // ヘッダー定義
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            // Formデータ作成
            const formData = new FormData();
            formData.append('empno', String(empno));

            // 画像データ追加
            if (select == 'img1') {
                formData.append("file1", file);
            } else if (select == 'img2') {
                formData.append("file2", file);
            }

            axios
                .post('/uploadTableImage', formData, config)
                .then((res) => {
                    // 通信成功したら画像変更
                    if (res.data.message == 'success') {
                        const uploadObj = res.data.newData;
                        setEmpList(uploadObj);
                    }
                })
                .catch((error) => alert('通信に失敗しました'));
        }
    };

    /**
     * テーブル情報作成
    */
    const table = useReactTable({
        // 以下必須
        data: empList, // テーブルに表示させるデータ
        columns, // カラム情報
        getCoreRowModel: getCoreRowModel(), // テーブルの行を返す関数

        // 以下オプション
        getPaginationRowModel: getPaginationRowModel(), // ページネーション機能追加
        initialState: {
            pagination: {
                pageSize: pageSize, // 初期表示件数
            },
        },
        getSortedRowModel: getSortedRowModel(), // ソート機能追加
        getFilteredRowModel: getFilteredRowModel(), // 絞り込み機能追加
        state: {
            globalFilter, // 絞り込みワード
        },
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">従業員一覧</h2>}
        >
            <Head title="従業員一覧" />

            <div className="mb-2 w-100" style={{ paddingLeft: 1, paddingRight: 1 }}>
                <div>絞り込みワード
                    <input
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-100 p-2 font-lg shadow border border-block"
                    placeholder="検索"
                    />
                </div>
                <div>
                    <SecondaryButton onClick={createModalOpen}>新規作成</SecondaryButton>
                </div>
            </div>

            <div className="mb-2">
                <div>表示件数：
                    <input
                        type="number"
                        className="h-8"
                        value={pageSize} 
                        onChange={(e) => {
                            // pageSizeが空でなければ表示件数を変更
                            if (e.target.value != '') {
                                table.setPageSize(parseInt(e.target.value));
                                setPageSize(parseInt(e.target.value));
                            }
                        }}
                        min="1"
                        max={table.getCoreRowModel().rows.length} // 全件数を設定
                        pattern="^[0-9]+$"
                    />
                </div>
            </div>

            <div className="emp-wrapper">
                <table className="emp-table">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        // ソート機能実装
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {{
                                        asc: ' 🔼',
                                        desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={confirmingCreate} onClose={closeModal} maxWidth={'5xl'}>
                <CheckCreateModal deptList={deptList} rolesList={rolesList} close={closeModal} onClick={createRow} />
            </Modal>
            <Modal show={confirmingEdit} onClose={closeModal} maxWidth={'5xl'}>
                <CheckEditModal empRow={selectEmpRow} deptList={deptList} rolesList={rolesList} close={closeModal} onClick={editRow} />
            </Modal>
            <Modal show={confirmingDelete} onClose={closeModal}>
                <CheckDeleteModal empRow={selectEmpRow} close={closeModal} onClick={deleteRow} />
            </Modal>


            <div className="pagination">
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    {'<<'}
                </button>
                {Array.from({ length: table.getPageCount() }, (_, i) => i).map((index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor:
                                // アクティブなページ番号のみ色をつける
                                table.getState().pagination.pageIndex === index ? '#888af9' : 'white',
                            color:
                                // アクティブなページ番号のフォントは白。それ以外は黒
                                table.getState().pagination.pageIndex === index ? 'white' : 'black',
                            pointerEvents:
                                // アクティブなページ番号は押せないように
                                table.getState().pagination.pageIndex === index ? 'none' : 'auto',
                        }}
                        onClick={() => table.setPageIndex(index)}
                    >
                        {index + 1}
                    </div>
                ))}
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    {'>>'}
                </button>
            </div>
        </AuthenticatedLayout>
    )
};

export default Employer