import 'dotenv/config';
import bcrypt from 'bcrypt';
import TyResponse from '../interfaces/TyResponse';
import users from '../model/database/models/users';
import jwt from 'jsonwebtoken';

async function read(username:string, password:string):Promise<TyResponse> {
    const userAccount = await users.findOne({ where: { username } });
    if (userAccount === null) return { message: 'User not found', code: 404 };

    const { password:pass } = userAccount?.dataValues;
    const descriptPassword = await bcrypt.compare(password, pass);
    if (!descriptPassword) return { message: 'Incorrect password', code: 400 };

    const secret = process.env.JWT_SECRET;
    const config = { expiresIn: '24h', algorithm: 'HS256' };
    const token = jwt.sign(userAccount?.dataValues, String(secret), config as any);

    return { message: token, code: 200 };
}

export default {
    read,
}