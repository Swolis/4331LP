import { Request, Response } from 'express';
import Model from 'mongoose';
import recipeSchema, {IRecipe, getRecipeModel} from '../../models/inventoryModels/recipieSchema';
import { getProductModel, IProduct } from '../../models/inventoryModels/productSchema';



export const useRecipe = async (req: Request, res: Response): Promise<Response> => {
    console.log('Entering UseRecipe Controller');

    const RecipeModel = getRecipeModel(req.app.locals.client);
    const ProductModel = getProductModel(req.app.locals.client);

    try { 
        

        const recipeID = req.body.recipeID;

        const recipe = await RecipeModel.findById(recipeID);
        
        if(!recipe){
            return res.status(404).json({message: 'Recipe not found.'});
        }

        for (const { productId, quantity } of recipe.products) {
            const product = await ProductModel.findById(productId);

            if (!product) {
                return res.status(404).json({message: 'Product Not Found'});
            }

            const { newCase, newPacks, newEach } = useProduct(product, quantity);

            product.inventory.case = newCase;
            product.inventory.innerPack = newPacks;
            product.inventory.each = newEach;

            await product.save();
        }
        
        return res.status(200).json({ message: 'Recipe used successfully' });
    }catch (error: any) {
        console.error('Error using recipe: ', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
}

function useProduct( product: IProduct, productUsed: number): any {
    const unitsPerPack = product.inventoryConfig.each;
    const packsPerCase = product.inventoryConfig.innerPack;

    let currentEach = product.inventory.each;
    let currentPacks = product.inventory.innerPack;
    let currentCase = product.inventory.case;
    while (productUsed > currentEach) { 
        // break out inner pack 
        if (currentPacks > 0){
            currentEach += unitsPerPack;
            currentPacks--;
        }else{
            // break down case
            currentPacks += packsPerCase;
            currentCase--;
        }
    }

    const newInventory = {currentCase, currentPacks, currentEach};
    return newInventory;
}