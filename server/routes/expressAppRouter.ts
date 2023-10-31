import { Router } from 'express';
import ProductRouter from './api/ProductRouter';
import RecipeRouter from './api/RecipeRouter';

const mainRouter = Router();



// Mount the required router
// Porduct routes
mainRouter.use('/api/product', ProductRouter);


// Recipe routes
mainRouter.use('/api/recipe', RecipeRouter);


export default mainRouter;