// ProductRouter.ts
import { Router } from 'express';
import { createProductController } from '../../controllers/inventoryControllers/CreateProductController';
import { findProductController } from '../../controllers/inventoryControllers/productSearchController';

const ProductRouter = Router();

// routes for each function
ProductRouter.post('/CreateProduct', createProductController);
//ProductRouter.put('/:id', editProductController);
//ProductRouter.delete('/:id', deletePoductController);

ProductRouter.post('/Search', findProductController);

export default ProductRouter;