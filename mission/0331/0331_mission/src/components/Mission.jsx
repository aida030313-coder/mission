import { useEffect, useState } from 'react'

function Mission() {

    useEffect(() => {
        const prom = prompt("문자열을 입력해주세요. " );
    }, []);


    return (
        <>
            <h2>{prom}</h2>
            <input
                type="text"
            />
        </>
    );
}

export default Mission