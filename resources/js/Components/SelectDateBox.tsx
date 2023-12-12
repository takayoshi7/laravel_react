import React, { useState, useEffect } from 'react'

const SelectDateBox = (props: { date: string; onChange: (selectDate: string) => void; }) => {
    const today: Date     = new Date();          // 現在の日付
    const nowYear: number = today.getFullYear(); // 現在の年

    // 取得した日付を年・月・日に分ける
    const dateArray = props.date.match(/\b\d+\b/g);
    const year: string  = dateArray ? dateArray[0] : '1980';
    const month: string = dateArray ? dateArray[1] : '1';
    const day: string   = dateArray ? dateArray[2] : '1';

    // 年・月・日の入力欄の値
    const [ date, setDate ] = useState({
        year: year,
        month: month,
        day: day,
    });

    const [ selectDay, setSelectDay ] = useState<JSX.Element[]>([]); // 選択できる日付リスト

    // 年のoptionタグ作成
    let setYear = [];
    for (let i = (Number(year) - 100); i < ((nowYear + 1) < Number(year) + 100 ? (nowYear + 1) : Number(year) + 100); i++) {
        setYear.push(i);
    }
    const selectYear = setYear.map((value,index)=><option key={index} value={value}>{value}</option>);

    // 月のoptionタグ作成
    let setMonth = [];
    for (let i = 1; i < 13; i++) {
        setMonth.push(i);
    }
    const selectMonth = setMonth.map((value,index)=><option key={index} value={value}>{value}</option>);

    useEffect(() => {
        // 存在しない日が選択できないように選択できる日を設定
        let getDate  = new Date(Number(date.year), Number(date.month), 0); // 設定した年月データ
        let finalDay = getDate.getDate();                                  // 設定した年月の最終日
        let dayArray = [];                                                 // 日付リスト用配列
        // 日付リスト作成
        for (let i = 1; i < finalDay + 1; i++) {
            dayArray.push(i);
        }
        // 日のoptionタグ作成
        const dayList = dayArray.map((value,index)=><option key={index} value={value}>{value}</option>);
        setSelectDay(dayList);

        // 入力値が変わったら年月日を変更する
        props.onChange(date.year + '-' + date.month + '-' +date.day);
    }, [date]);

    /**
     * 入力欄への入力
    */
    const handleEdit = (e: { target: { name: string; value: string; }; }) => {
        setDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <div className="flex">
                <div className="w-32 text-center border-r-2 border-slate-300">年</div>
                <div className="w-32 text-center border-r-2 border-slate-300">月</div>
                <div className="w-32 text-center">日</div>
            </div>
            <select className="border-0 w-32 text-center border-r-2 border-slate-300" value={date.year} name="year" onChange={handleEdit}>
                {selectYear}
            </select>
            <select className="border-0 w-32 text-center border-r-2 border-slate-300" value={date.month} name="month" onChange={handleEdit}>
                {selectMonth}
            </select>
            <select className="border-0 w-32 text-center" value={date.day} name="day" onChange={handleEdit}>
                {selectDay}
            </select>
        </>
    )
}

export default SelectDateBox
