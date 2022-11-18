import TyDataUser from '../interfaces/TyDataUser';
import TyResponse from '../interfaces/TyResponse';
import TyTransactions from '../interfaces/TyTransactions';
import transactions from '../model/database/models/transactions';

async function read(data_user:TyDataUser, by:string, date:any):Promise<TyResponse> {
    if (by.includes('cash')) return await getTransactionsByType(data_user, by, date);
    return await getAllTransactions(data_user, date);
}

async function getAllTransactions(data_user:TyDataUser, date:any) {
    const { accountId } = data_user;
    const transactionsList = [
        ...await transactions.findAll({ where: { debited_account_id: accountId } }),
        ...await transactions.findAll({ where: { credited_account_id: accountId } })
    ]

    if (date !== undefined) return await filterByDate(transactionsList as any, date);
    return { message: transactionsList, code: 200 };
}

async function getTransactionsByType(data_user:TyDataUser, by:string, date:any) {
    const { accountId } = data_user;
    const transactionsList = [];

    if (by === 'cash-out') {
        transactionsList.push(
            ...await transactions.findAll({ where: { credited_account_id: accountId } })
        );

        if (date !== undefined) return await filterByDate(transactionsList as any, date);
    } else if (by === 'cash-in') {
        transactionsList.push(
            ...await transactions.findAll({ where: { debited_account_id: accountId } })
        );

        if (date !== undefined) return await filterByDate(transactionsList as any, date);
    }

    return { message: transactionsList, code: 200 };
}

async function filterByDate(transactionsList:any, date:any) {
    const list = transactionsList.map((transaction:TyTransactions) => {
        const dObj = transaction.dataValues.createdAt;
        const dCurr = `${dObj.getDate()}/${dObj.getMonth()+1}/${dObj.getFullYear()}`;
        if (dCurr === date) return transaction;
    });
    
    return { message: list, code: 200 };
}

export default {
    read,
}