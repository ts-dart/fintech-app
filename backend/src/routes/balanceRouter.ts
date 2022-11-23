import { Router } from 'express';
import balanceController from '../controllers/balanceController';
import validatorJwtToken from '../middlewares/validatorJwtToken';

const route = Router();

route.get('/', validatorJwtToken as any, balanceController.read as any);

export default route