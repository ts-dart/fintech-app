import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const doRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ username, password })
        })
        .then((data) => data.json())
        .then((data) => setResponse(data.message));
    };

    const registredSuccess = () => {
        return(
            <div>
                <p>Usuário registrado com sucesso</p>
                <input
                    type='button'
                    value='Voltar e fazer login'
                    onClick={()=>navigate('/')}
                />
            </div>
        )
    }

    return(
        <section>
            <div>
                <label htmlFor='inputUsername'>
                    Nome de Usuario:
                    <input
                        type='text'
                        id='inputUsername'
                        placeholder='ex:@th.cash'
                        onChange={({target: { value }})=>setUsername(value)}
                    />
                </label>
                <label htmlFor="inputPassword">
                    Senha:
                    <input
                        type='password'
                        id='inputPassword'
                        onChange={({target: { value }})=>setPassword(value)}
                        placeholder='senha'
                    />
                </label>
                <input type='button' value='Criar Conta' onClick={doRegister}/>
            </div>
            {response==='Successfully registered user'?registredSuccess():''}
        </section>
    );
}