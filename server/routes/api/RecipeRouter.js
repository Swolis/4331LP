// RecipeRouter.ts
import { Router } from 'express';
import CreateRecipeController from '../controllers/CreateRecipeController';
const RecipeRouter = Router();
RecipeRouter.post('/', CreateRecipeController);
export default RecipeRouter;
