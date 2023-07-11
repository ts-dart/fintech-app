import { useContext, useState } from "react";
import Context from "../context/context";
import '../styles/doTransactions.css';

export default function Transactions() {
    const { update, setUpdate } = useContext(Context);
    const [username, setUsername] = useState('');
    const [value, setValue] = useState('');
    const [response, setResponse] = useState('');

    const transfer = () => {
        fetch(`https://app-cash-api-deploy.onrender.com/operation`, {
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
        <>
            <div id='transferBox'>
                <p>Faça uma transferencia para um usuario passando o username</p>
                <label htmlFor='inputUsername' id='inputLabel'>
                    <strong>Username:</strong>
                    <input
                        type="text"
                        id='inputUsername'
                        className='transferInput'
                        onChange={({ target: { value } })=>setUsername(value)}
                    />
                </label>
                <label htmlFor='inputValue' id='inputLabel'>
                    <strong>Digite o valor que sera transferido:</strong>
                    <input
                        type="text"
                        id='inputValue'
                        className='transferInput'
                        onChange={({ target: { value } })=>setValue(value)}
                    />
                </label>
                <input
                    type="button"
                    value='Realizar transferencia'
                    id='transferBtn'
                    onClick={()=>transfer()}
                />
            </div>
            <div id="msgP">
                <p>{response}</p>
            </div>
        </>
    );
}