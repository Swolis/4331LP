// RecipeRouter.ts
import { Router } from 'express';

import  {createRecipeController} from '../../controllers/inventoryControllers/CreateRecipeController';

const RecipeRouter = Router();

RecipeRouter.post('/Create-Recipe', createRecipeController);

export default RecipeRouter;