import { Router } from 'express';

import { createOrderController } from '../../../controllers/registerControllers/createOrderController';

const orderRouter = Router();

orderRouter.post('/Save-Order', createOrderController);

export default orderRouter;