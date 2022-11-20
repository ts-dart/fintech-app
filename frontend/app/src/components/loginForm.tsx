import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = () => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ username, password })
        })
        .then((data) => data.json())
        .then((data) => {
            const regex = '(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z.]{8,}$';
            if (data.token.match(regex)) {
                localStorage.setItem('token', data.token);
                return navigate('/home');
            }
        });
    };

    return (
        <div>
            <label htmlFor='inputUsername'>
                Nome de Usuario:
                <input
                    type='text'
                    id='inputUsername'
                    onChange={({target: { value }})=>setUsername(value)}
                    placeholder='username'
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
            <input type='button' value='Entrar' onClick={doLogin}/>
            <input type='button' value='Nova Conta' onClick={()=>navigate('/register')}/>
        </div>
    );
}