import { useEffect, useState } from 'react';

export default function Header() {
    const [balance, setBalance] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/balance', {
            mode: 'cors',
            headers: {'authorization': `${localStorage.getItem('token')}`},
        })
        .then((data) => data.json())
        .then((data) => setBalance(data.message));
    }, []);

    return(
        <header>
            <p>Saldo atual: {balance}</p>
        </header>
    );
}