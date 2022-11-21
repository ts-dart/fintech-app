import { useContext, useState } from "react";
import Context from "../context/context";

export default function Transactions() {
    const { update, setUpdate } = useContext(Context);
    const [username, setUsername] = useState('');
    const [value, setValue] = useState('');
    const [response, setResponse] = useState('');

    const transfer = () => {
        fetch(`http://localhost:3000/operation`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ username, value }),
        })
        .then((data) => data.json())
        .then((data) => {
            setResponse(data.message);
            setUpdate(update ? false : true);
        });    
    };

    return(
        <div>
            <div>
                <label htmlFor='inputUsername'>
                    Digite o nome de usuario da pessoa que recebera a transferencia:
                    <input
                        type="text"
                        id='inputUsername'
                        onChange={({ target: { value } })=>setUsername(value)}
                    />
                </label>
                <label htmlFor='inputValue'>
                    Digite o valor que sera transferido:
                    <input
                        type="text"
                        id='inputValue'
                        onChange={({ target: { value } })=>setValue(value)}
                    />
                </label>
                <input
                    type="button"
                    value='Realizar transferencia'
                    onClick={()=>transfer()}
                />
            </div>
            <p>{response}</p>
        </div>
    );
}