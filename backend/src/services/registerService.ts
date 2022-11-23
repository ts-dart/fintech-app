import users from '../model/database/models/users';
import accounts from '../model/database/models/accounts';
import TyResponse from '../interfaces/TyResponse';
import bcrypt from 'bcrypt';

async function create(username:string, password:string):Promise<TyResponse> {
    const data = await users.findOne({ where: { username } });
    if (data !== null) {
        return { message: 'Username already registered', code: 400 };
    };

    const accountCreated = await accounts.create({ balance: '100.00' });
    await users.create({
        username,
        password: await bcrypt.hash(password, 10),
        accountId: accountCreated.id,
    });

    return { message: 'Successfully registered user', code: 201 };
}

export default {
    create,
}