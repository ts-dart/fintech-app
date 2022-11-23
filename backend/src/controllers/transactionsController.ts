import { Response } from 'express';
import RequestWithUser from '../interfaces/RequestWithUser';
import transactionsService from '../services/transactionsService';

async function read(req:RequestWithUser, res:Response):Promise<Response> {
    const { by, date } = req.query;
    const data_user = req.user;
    const response = await transactionsService.read(data_user, String(by), date);
    return res.status(response.code).json({ message: response.message });
}

export default {
    read,
}