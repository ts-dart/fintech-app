import accounts  from '../model/database/models/accounts';
import TyDataUser from '../types/TyDataUser';

async function read(dataUser:TyDataUser) {
    const userAcc = await accounts.findOne({ where: { id: dataUser.accountId} })
    return { message: userAcc?.balance, code: 200};
}

export default {
    read,
}