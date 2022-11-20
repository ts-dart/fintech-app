import { useEffect, useState } from "react";

export default function Transactions() {
    const [transactions, setTransactions] = useState();
    const [date, setDate] = useState(undefined);
    const [type, setType] = useState(undefined);

    useEffect(() => {
        fetch(`http://localhost:3000/transactions?date=${date}&by=${type}`, {
            mode: 'cors',
            headers: {'authorization': `${localStorage.getItem('token')}`},
        })
        .then((data) => data.json())
        .then((data) => setTransactions(data.message));
    }, []);

    return(
        <p>{transactions}</p>
    );
}