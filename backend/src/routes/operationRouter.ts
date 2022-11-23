import { Router } from 'express';
import operationController from '../controllers/operationController';
import validatorJwtToken from '../middlewares/validatorJwtToken';

const route = Router();

route.post('/', validatorJwtToken as any, operationController.create as any);

export default route