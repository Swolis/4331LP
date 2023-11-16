// ProductRouter.ts
import { Router } from 'express';
import { createProductController } from '../../controllers/inventoryControllers/CreateProductController';

const ProductRouter = Router();

// routes for each function
ProductRouter.post('/CreateProduct', createProductController);
//ProductRouter.put('/:id', editProductController);
//ProductRouter.delete('/:id', deletePoductController);

export default ProductRouter;