import React, { useState } from 'react'
import { addresses } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';

type addressProps = {
    list: addresses[] | null;
    error: string;    
    onClick: (address: addresses | null) => void;
}

const SelectAddressModal = (props: addressProps) => {
    // addressListがnullならレンダリングしない
    if (!props.list) return;

    // 受け取った住所リストを代入
    const addressList = Object.values(props.list);

    const [ address, setAddress ] = useState<addresses | null>(null); // 選択した住所情報

    return (
        <>
            <p className="block font-medium text-lg text-gray-700 ml-5 mb-5">住所を選択してください</p>
                <div className="h-96 overflow-auto m-5 border-2">
                    {addressList.map((element) => {
                        return (
                            <label key={element.id} className="block">
                            <input
                                type="radio"
                                checked={address == element}
                                onChange={() => setAddress(element)}
                            />
                                {element.pref + element.city + element.town}
                            </label>
                        );
                    })}
                </div>
            <div className="flex ml-5">
                <PrimaryButton onClick={() => props.onClick(address)}>決定</PrimaryButton>
                <p className="ml-2 text-red-500 flex items-center">{props.error}</p>
            </div>
        </>
    )
}

export default SelectAddressModal