// RecipeRouter.ts
import { Router } from 'express';

import  {createRecipeController} from '../../controllers/inventoryControllers/CreateRecipeController';
import { RecipeSearchController } from '../../controllers/inventoryControllers/RecipeSearchController';

const RecipeRouter = Router();

RecipeRouter.post('/Create-Recipe', createRecipeController);

RecipeRouter.post('/Search-Recipe', RecipeSearchController);
export default RecipeRouter;