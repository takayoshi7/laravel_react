import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { User, PageProps } from '@/types';
import React, { useState, useEffect} from 'react'
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, sortingFns } from '@tanstack/react-table';
import SecondaryButton from '@/Components/SecondaryButton';

const Employer = ({ auth, empData }: PageProps<{empData: {data: User}}>) => {
    const [empList, setEmpList] = useState<User[]>([]); // テーブル情報
    const [pageSize, setPageSize] = useState<number>(5); // 1ページの表示件数
    const [globalFilter, setGlobalFilter] = useState(''); // 絞り込みワード


    const list: any = empData.data;
    // 初回のみデータを取得してempListに入れる
    useEffect(() => {
        setEmpList(list);
    }, []);

    // テーブルのカラムの型定義
    const columnHelper = createColumnHelper<User>();

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
                props.row.original.img1
                ? <img src={'data:image/png;base64,' + props.getValue()} className="table-image-size" onClick={() => changeImage(props.row.original.empno, 'img1')} />
                : <img src={'storage/no_image.jpg'} className="table-image-size" onClick={() => changeImage(props.row.original.empno, 'img1')} />
            ),
            enableSorting : false, // ソート機能を停止
        }),
        columnHelper.accessor('img2', {
            header: '画像2',
            cell: (props) => (
                props.row.original.img2
                ? <img src={props.getValue()} className="table-image-size" onClick={() => changeImage(props.row.original.empno, 'img2')} />
                : <img src={'storage/no_image.jpg'} className="table-image-size" onClick={() => changeImage(props.row.original.empno, 'img2')} />
            ),
            enableSorting : false, // ソート機能を停止
        }),
        columnHelper.accessor('name', {
            header: '役割',
        }),
        columnHelper.display({
            id: 'update',
            header: '編集',
            cell: (props) => (
                <SecondaryButton onClick={()=>updateRow(props.row.original.empno)}>
                編集
                </SecondaryButton>
            ),
        }),
        columnHelper.display({
            id: 'delete',
            header: '削除',
            cell: (props) => (
                <SecondaryButton onClick={()=>deleteRow(props.row.original.empno)}>
                削除
                </SecondaryButton>
            ),
        }),
    ];


    const updateRow = (empno: number) => {
        console.log(empno);

    }

    const deleteRow = (empno: number) => {
        console.log(empno);
    }

    const changeImage = (empno: number, select: string) => {
        console.log('empno: ' + empno + ',select: ' + select);
    }







    // テーブル情報作成
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
                <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-100 p-2 font-lg shadow border border-block"
                placeholder="検索"
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <div>表示件数：
                    <input
                        type="number"
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
                                table.getState().pagination.pageIndex === index ? 'none' : '',
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