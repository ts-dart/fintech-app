import accounts from '../model/database/models/accounts';
import users from '../model/database/models/users';
import transactions from '../model/database/models/transactions';
import TyDataUser from '../interfaces/TyDataUser';
import TyResponse from '../interfaces/TyResponse';

async function create(dataUser:TyDataUser, username:string, val:any):Promise<TyResponse> {
    const value = parseFloat(val);

    const userCashIn = await users.findOne({ where: { username } });
    if (userCashIn === null) return { message: 'Username não encontrado', code: 404 };
    if (dataUser.username === username) return { message: 'não é possível realizar uma transferência para si mesmo', code: 400 };

    const accUserCashOn = await accounts.findOne({ where: { id: dataUser.accountId } });
    if (parseFloat(accUserCashOn!.balance) < value) return { message: `Saldo insuficiente para realizar a transação`, code: 400 };

    const accUserCashIn = await accounts.findOne({ where: { id: userCashIn.accountId } });
    
    await accounts.update(
        { balance: parseFloat(String(accUserCashOn?.balance)) - value},
        { where: { id: accUserCashOn?.id } }
    );

    await accounts.update(
        { balance: parseFloat(String(accUserCashIn?.balance)) + value},
        { where: { id: accUserCashIn?.id } }
    );

    await transactions.create({
        debitedAccountId: userCashIn.accountId,
        creditedAccountId: dataUser.accountId,
        value: value,
        createdAt: new Date(),
    });

    return { message: 'Transação concluída com sucesso', code: 201};
}

export default {
    create,
}