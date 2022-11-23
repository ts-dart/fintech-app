import { Router } from 'express';
import transactionsController from '../controllers/transactionsController';
import validatorJwtToken from '../middlewares/validatorJwtToken';

const route = Router();

route.get('/', validatorJwtToken as any, transactionsController.read as any);

export default route