import React from 'react'
import { Dept } from '@/types';

const SelectDeptBox = (props: { list: any; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; }) => {
    // 部署リスト代入
    let list = props.list;

    // sortカラム順に並べ替え
    list = list.sort((a: Dept, b: Dept) => {
        return (a.sort < b.sort) ? -1 : 1;
    });

    // リストを基にoptionタグ作成
    const option = list.map((obj: Dept)=><option key={obj.deptno} value={obj.deptno}>{obj.deptno}:{obj.dname}({obj.loc})</option>);

    return (
        <>
            <select className="border-0" name={props.name} value={props.value} onChange={(e) => props.onChange(e)} required>
                {option}
            </select>
        </>
    )
}

export default SelectDeptBox
