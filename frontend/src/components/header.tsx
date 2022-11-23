import { useEffect, useState, useContext } from 'react';
import Context from '../context/context';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css'

export default function Header() {
    const navigate = useNavigate();
    const { update } = useContext(Context);
    const [balance, setBalance] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/balance', {
            mode: 'cors',
            headers: {'authorization': `${localStorage.getItem('token')}`},
        })
        .then((data) => data.json())
        .then((data) => setBalance(data.message));
    }, [update]);

    return(
        <header>
            <strong><p id='pBalance'>Saldo: R${balance}</p></strong>
            <input
                type='button'
                value='Sair'
                onClick={()=>{
                    localStorage.setItem('token', '')
                    return navigate('/');
                }}
            />
        </header>
    );
}