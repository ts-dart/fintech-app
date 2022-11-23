import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const doRegister = () => {
        fetch('http://localhost:3001/register', {
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
            <div className='resDiv'>
                <strong><p id='pMessage'>Usuário registrado com sucesso</p></strong>
                <input
                    type='button'
                    value='Voltar e fazer login'
                    id='button'
                    onClick={()=>navigate('/')}
                />
            </div>
        )
    }

    return(
        <section>
            <div id='form' className='nameLabel'>
                <label htmlFor='inputUsername' id='nameLabel'>
                    <strong>Nome de Usuario:</strong>
                    <input
                        type='text'
                        id='inputUsername'
                        className='inputLogin'
                        placeholder='ex:@th.cash'
                        onChange={({target: { value }})=>setUsername(value)}
                    />
                </label>
                <label htmlFor="inputPassword" id='nameLabel'>
                    <strong>Senha:</strong>
                    <input
                        type='password'
                        id='inputPassword'
                        className='inputLogin'
                        onChange={({target: { value }})=>setPassword(value)}
                        placeholder='min 8 chars, um numero, uma letra maiuscula'
                    />
                </label>
                <div id='buttons'>
                    <input type='button' value='Criar Conta' id='button' onClick={doRegister}/>
                    <input type='button' value='Valtar para login' id='button' onClick={()=>navigate('/')}/>
                </div>
                {response==='Successfully registered user'?registredSuccess():''}
                {response==='Username already registered'
                    ?(<strong><p>Nome de usuario ja registrado</p></strong>)
                    : ''}
                {response.includes('"password" with value')
                    ?(<strong>
                        <p>
                            senha não permitida, sua senha precisa ter o minimo de 8 caracteres, ao menos um numero e uma letra maiuscula
                        </p>
                    </strong>)
                    : ''}
            </div>
        </section>
    );
}