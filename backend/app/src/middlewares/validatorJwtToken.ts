import 'dotenv/config'
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import RequestWithUser from '../interfaces/RequestWithUser';

export default async (req:RequestWithUser, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' }); 
  }

  try {
    const decodeToken = jwt.verify(token, String(process.env.JWT_SECRET));
    req.user = decodeToken;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};