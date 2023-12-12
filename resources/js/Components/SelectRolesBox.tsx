import React from 'react'
import { Roles } from '@/types';

const SelectRolesBox = (props: { list: any; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; }) => {
    // 役割リスト代入
    let list = props.list;

    // リストを基にoptionタグ作成
    const option = list.map((obj: Roles)=><option key={obj.id} value={obj.rname}>{obj.rname}</option>);

    return (
        <>
            <select className="border-0 text-center" name={props.name} value={props.value} onChange={(e) => props.onChange(e)} required>
                {option}
            </select>
        </>
    )
}

export default SelectRolesBox
