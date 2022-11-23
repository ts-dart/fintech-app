import { Request, Response } from 'express';
import registerService from '../services/registerService';

async function create(req:Request, res:Response):Promise<Response> {
    const { username, password } = req.body
    const response = await registerService.create(username, password);
    return res.status(response.code).json({ message: response.message });
}

export default {
    create,
}