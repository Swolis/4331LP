// ProductRouter.ts
import { Router } from 'express';
const createProductController = require('../controllers/CreateContactController');
const ProductRouter = Router();
// routes for each function
ProductRouter.post('/', createProductController);
//ProductRouter.put('/:id', editProductController);
//ProductRouter.delete('/:id', deletePoductController);
export default ProductRouter;
