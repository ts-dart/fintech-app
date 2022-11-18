import { Response } from 'express';
import RequestWithUser from '../interfaces/RequestWithUser';
import operationService from '../services/operationService';

async function create(req:RequestWithUser, res:Response):Promise<Response> {
    const { username, value } = req.body;
    const data_user = req.user;
    const response = await operationService.create(data_user, username, value);
    return res.status(response.code).json({ message: response.message });
}

export default {
    create,
}