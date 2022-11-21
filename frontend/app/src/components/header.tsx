import { useEffect, useState, useContext } from 'react';
import Context from '../context/context';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const { update } = useContext(Context);
    const [balance, setBalance] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/balance', {
            mode: 'cors',
            headers: {'authorization': `${localStorage.getItem('token')}`},
        })
        .then((data) => data.json())
        .then((data) => setBalance(data.message));
    }, [update]);

    return(
        <header>
            <div>
                <p>Saldo: R${balance}</p>
                <input
                    type='button'
                    value='sair'
                    onClick={()=>{
                        localStorage.setItem('token', '')
                        return navigate('/');
                    }}
                />
            </div>
        </header>
    );
}