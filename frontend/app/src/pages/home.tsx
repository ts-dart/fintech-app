import { useState, useEffect } from 'react'
import Header from '../components/header';
import Transactions from '../components/transactions';
import DoTransactions from '../components/doTransaction';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'

export default function Home() {
    const navigate = useNavigate();
    const [seeTransactions, setSeeTransactions] = useState(false);
    const [_seeDoTransaction, setSeeDoTransaction] = useState(false);
    const [requisitionStatus, setRequisitionStatus] = useState(true);

    const redirectToLogin = () => {
        window.alert('Login não autorizado');
        return navigate('/');
    }; 

    useEffect(() => {
        fetch('http://localhost:3000/balance',
        { 
            method: 'GET',
            mode: 'cors',
            headers: {
                'authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((data) => data.json())
            .then((data) => setRequisitionStatus(data.status === 200 ? true : false))
    }, []);

    return (
        <>
            {
                !requisitionStatus
                    ? (
                        <><p>...</p>
                        {redirectToLogin()}</>
                    )
                    : (
                        <>
                            <Header/>
                            <main>
                                <div id='sactions'>
                                    <input 
                                        type='button'
                                        value='Ver transações'
                                        onClick={()=>{
                                            setSeeTransactions(true)
                                            setSeeDoTransaction(false)
                                        }}/>
                                    <input
                                        type='button' 
                                        value='Fazer uma nova transações' 
                                        onClick={()=>{
                                            setSeeDoTransaction(true)
                                            setSeeTransactions(false)
                                        }}/>
                                </div>
                                {seeTransactions ? <Transactions/> : <DoTransactions/>}
                            </main>
                        </>
                    )
            }
        </>
    )
}

// redirectToLogin()