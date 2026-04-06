import React, { useState } from 'react'

function num1_ToDo() {

    const [inputValue, setInputValue] = useState('');
    const [Todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        setTodos([
            ...Todos,
            inputValue
        ])

        setInputValue('');
    }
    return (
        <>
            <h2>할일 목록</h2>
            <input
                type="text"
                placeholder='새 할일'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleAddTodo}>추가</button>

            {Todos.map((Todo, index) => <div key={index}>{Todo}</div>)}
        </>
    )
}

export default num1_ToDo
