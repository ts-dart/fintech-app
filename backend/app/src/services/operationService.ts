import accounts from '../model/database/models/accounts';
import users from '../model/database/models/users';
import transactions from '../model/database/models/transactions';
import TyDataUser from '../interfaces/TyDataUser';
import TyResponse from '../interfaces/TyResponse';

async function create(dataUser:TyDataUser, username:string, val:any):Promise<TyResponse> {
    const value = parseFloat(val);

    const userCashIn = await users.findOne({ where: { username } });
    if (userCashIn === null) return { message: 'User not found', code: 404 };
    if (dataUser.username === username) return { message: 'it is not possible to perform a transfer to itself', code: 400 };

    const accUserCashIn = await accounts.findOne({ where: { id: userCashIn.accountId } });
    if (parseFloat(accUserCashIn!.balance) < value) return { message: `Insufficient balance on ${username} account`, code: 400 };

    const accUserCashOn = await accounts.findOne({ where: { id: dataUser.accountId } });
    
    await accounts.update(
        { balance: parseFloat(String(accUserCashOn?.balance)) + value},
        { where: { id: accUserCashOn?.id } }
    );

    await accounts.update(
        { balance: parseFloat(String(accUserCashIn?.balance)) - value},
        { where: { id: accUserCashIn?.id } }
    );

    await transactions.create({
        debitedAccountId: userCashIn.accountId,
        creditedAccountId: dataUser.accountId,
        value: value,
        createdAt: new Date(),
    });

    return { message: 'Successfully completed transaction', code: 201};
}

export default {
    create,
}