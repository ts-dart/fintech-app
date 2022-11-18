import { Router } from 'express';
import registerController from '../controllers/registerController';
import validatorRegisterJoi from '../middlewares/validatorRegisterJoi';

const route = Router();

route.post('/', validatorRegisterJoi, registerController.create);

export default route