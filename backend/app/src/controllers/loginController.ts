import { Request, Response } from 'express';
import loginService from '../services/loginService';

async function read(req:Request, res:Response):Promise<Response> {
    const { username, password } = req.body;
    const response = await loginService.read(username, password);
    return res.status(response.code).json({ token: response.message });
}

export default {
    read,
}