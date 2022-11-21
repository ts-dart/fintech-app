import { useEffect, useState } from "react";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [date, setDate] = useState(undefined);
    const [type, setType] = useState('todas');
    const ARR = ['id', 'Conta debitada', 'Conta creditada', 'valor', 'data']

    const genTd = (value:string | number, index:number) => {
        if (typeof value === 'string' 
        && value.match('(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z$*&@#]')) {
            const arrDate = value.split('T')[0].split('-');
            const date = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
            return (<td key={ index }>{ date }</td>);
        }
        return (<td key={ index }>{ value }</td>);
    };

    const formatDate = (date:string) => {
        const arrDate = date.split('-');
        const formated = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
        return formated;
    };

    useEffect(() => {
        fetch(`http://localhost:3000/transactions?date=${date}&by=${type}`, {
            mode: 'cors',
            headers: {'authorization': `${localStorage.getItem('token')}`},
        })
        .then((data) => data.json())
        .then((data) => setTransactions(data.message));
    }, [type, date]);

    return(
        <div>
            <div>
                <label htmlFor='selectType'>
                    Selecione o tipo de tansação:
                    <select
                        data-testid="comparison-filter"
                        id="selectType"
                        onChange={({ target }) => setType(target.value as any)}
                    >
                        <option id='sel'>todas</option>
                        <option>cash-in</option>
                        <option>cash-out</option>
                    </select>
                </label>
                <label htmlFor='inputDate'>
                    Selecione uma data:
                    <input
                        type='date'
                        id='inputDate'
                        onChange={({ target }) => setDate(formatDate(target.value) as any)}
                    />
                </label>
            </div>
            {
                transactions && transactions.every((t)=>t!==null) 
                    ? (
                        <table>
                            <thead>
                                <tr className="table-row-header">
                                { 
                                    ARR.map((key, index) => (
                                        <th
                                            key={ index }
                                            className="th-header-name"
                                        >
                                            { key }
                                        </th>
                                    ))
                                }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactions.map((transaction:any, index) => (
                                        <tr
                                            key={ index }
                                            className="table-row-data"
                                        >
                                            {Object.values(transaction).map((value:any, index) => (
                                                <>{genTd(value, index)}</>
                                            ))}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                    : (
                        <div>
                            <p>Transação não encontrada</p>
                        </div>
                    )
            }
        </div>
    );
}
