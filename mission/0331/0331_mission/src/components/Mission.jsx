import { useEffect, useState } from 'react'

function Mission() {

    const [ same, setSame] = useState();

    const prom = prompt("문자열을 입력해주세요. " );

    if (prom) {
        console.log("입력값: ", prom);
    };

    if (prom===same) {
    };


    return (
        <>
            <h2>{prom}</h2>
            <input
                type="text"
                value={same}
            />
        </>
    );
}

export default Mission