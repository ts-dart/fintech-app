import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const doLogin = () => {
        fetch('https://app-cash-api-deploy.onrender.com/login', {
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
            setResponse(data.message);

            if (data.message.match(regex)) {
                localStorage.setItem('token', data.message);
                return navigate('/home');
            }
        });
    };

    return (
        <div id='form'>
            <label htmlFor='inputUsername' id='nameLabel'>
                <strong>Nome de Usuario:</strong>
                <input
                    type='text'
                    id='inputUsername'
                    className='inputLogin'
                    onChange={({target: { value }})=>setUsername(value)}
                    placeholder='@username'
                />
            </label>
            <label htmlFor="inputPassword" id='nameLabel'>
                <strong>Senha:</strong>
                <input
                    type='password'
                    id='inputPassword'
                    className='inputLogin'
                    onChange={({target: { value }})=>setPassword(value)}
                    placeholder='senha'
                />
            </label>
            <div id='buttons'>
                <input 
                    type='button'
                    id='button'
                    className='className="btn btn-lg btn-success"'
                    value='Entrar'
                    onClick={doLogin}
                />
                <input
                    type='button'
                    id='button'
                    className='className="btn btn-lg btn-success"'
                    value='Nova Conta'
                    onClick={()=>navigate('/register')}
                />
            </div>
            {response === 'Username not registered'
                ?(<strong><p>Nome de usuario não registrado</p></strong>)
                : ''}
            {response === 'Incorrect password'
                ?(<strong><p>Senha incorreta</p></strong>)
                : ''}
        </div>
    );
}