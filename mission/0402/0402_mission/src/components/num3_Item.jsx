import React, { useState } from 'react'

function num3_Item() {

    const [fruit1, SetFruit1] = useState(false);
    const [fruit2, SetFruit2] = useState(false);
    const [fruit3, SetFruit3] = useState(false);
    const [fruit4, SetFruit4] = useState(false);
    const [fruit5, SetFruit5] = useState(false);

    const handleApple = () => SetFruit1(!fruit1);
    const handleBanana = () => SetFruit2(!fruit2);
    const handleOrange = () => SetFruit3(!fruit3);
    const handleGrape = () => SetFruit4(!fruit4);
    const handleStraw = () => SetFruit5(!fruit5);


    return (
        <div>
            <h2>아이템 선택</h2>
            <button onClick={handleApple}>사과</button>
            <button onClick={handleBanana}>바나나</button>
            <button onClick={handleOrange}>오렌지</button>
            <button onClick={handleGrape}>포도</button>
            <button onClick={handleStraw}>딸기</button>

            <p>
                선택된 과일: 
                {fruit1 ? "사과 " : ""}
                {fruit2 ? "바나나 " : ""}
                {fruit3 ? "오렌지 " : ""}
                {fruit4 ? "포도 " : ""}
                {fruit5 ? "딸기 " : ""}
                </p>
        </div>
    )
}

export default num3_Item
