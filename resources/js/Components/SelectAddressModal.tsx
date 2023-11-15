import React, { useState } from 'react'
import { addresses } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';

type addressProps = {
    list: addresses | null;
    error: string;    
    onClick: (address: addresses | null) => void;
}

const SelectAddressModal = (props: addressProps) => {
    // 受け取った住所リストを代入
    const addressList: addresses | null = props.list;
    // addressListがnullならレンダリングしない
    if (!addressList) return;

    const [address, setAddress] = useState<addresses | null>(null); // 選択した住所情報

    return (
        <>
            <p className="block font-medium text-lg text-gray-700">住所を選択してください</p>
            <br />
            {addressList.map((element) => {
                return (
                    <label key={element.id} className="block">
                    <input
                        type="radio"
                        value={element}
                        checked={address == element}
                        onChange={() => setAddress(element)}
                    />
                        {element.pref + element.city + element.town}
                    </label>
                );
            })}
            <br />
            <div className="flex">
                <PrimaryButton onClick={() => props.onClick(address)}>決定</PrimaryButton>
                <p className="ml-2 text-red-500 flex items-center">{props.error}</p>
            </div>
        </>
    )
}

export default SelectAddressModal