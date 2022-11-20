import { useState } from 'react'
import Header from '../components/header';
import Transactions from '../components/transactions';
import DoTransactions from '../components/doTransaction';

export default function Home() {
    const [seeTransactions, setSeeTransactions] = useState(false);
    const [_seeDoTransaction, setSeeDoTransaction] = useState(false);

    return (
        <>
            <Header/>
            <main>
                <div>
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
                <div>
                    {seeTransactions ? <Transactions/> : <DoTransactions/>}
                </div>    
            </main>
        </>
    )
}