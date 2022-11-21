import { Response } from 'express';
import RequestWithUser from '../interfaces/RequestWithUser';
import balanceService from '../services/balanceService';

async function read(req:RequestWithUser, res:Response):Promise<Response> {
    const data_user = req.user;
    const response = await balanceService.read(data_user);
    return res.status(response.code).json({ message: response.message, status: response.code });
}

export default {
    read,
}