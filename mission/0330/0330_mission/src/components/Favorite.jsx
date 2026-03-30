import React, {useState} from 'react'

function Favorite() {
    
    const [color, setColor] = useState('');
    const [fruit, setFruit] = useState('');

    const handleColorChange = (e) => {
        setColor(e.target.value);
    }
    const handleFruitChange = (e) => {
        setFruit(e.target.value);
    }

    return (
        <>
            <h4>좋아하는 색상: 
                <select
                    value={color}
                    onChange={handleColorChange}
                >
                    <option>파란색</option>
                    <option>빨간색</option>
                    <option>초록색</option>
                    <option>노란색</option>
                </select>
            </h4>

            <h4>좋아하는 과일: 
                <select
                    value={fruit}
                    onChange={handleFruitChange}
                >
                    <option>🍎사과</option>
                    <option>🍌바나나</option>
                    <option>🍊오렌지</option>
                    <option>🍇포도</option>
                </select>
            </h4>

            <h4>선택한 색상: {color}</h4>
            <h4>선택한 과일: {fruit}</h4>
        </>
    )
}

export default Favorite