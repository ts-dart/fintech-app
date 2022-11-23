import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const createUserDto = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string()
    .pattern(new RegExp('(?=.*\d)(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z$*&@#]{8,}$'))
    .required(),
});

const createUserValid = (req:Request, res:Response, next:NextFunction) => {
  const { error } = createUserDto.validate(req.body);
  if (!error) {
    return next();
  }
  const [message] = error.details.map((e) => e.message);
  return res.status(400).json({ message });
};

export default createUserValid;