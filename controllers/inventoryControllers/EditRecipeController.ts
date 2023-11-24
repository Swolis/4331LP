import { Request, Response } from "express";
import recipeSchema, {IRecipe, getRecipeModel} from "../../models/inventoryModels/recipieSchema";
import { Model, Connection, Types } from 'mongoose';

export const editRecipeController = async (req: Request, res: Response): Promise<void> => {
    const RecipeModel: Model<IRecipe> = getRecipeModel(req.app.locals.client);

    const newProductData = req.body.products.map((product: any) => {
        return {
            productId: product.id,
            name: product.name,
            quantity: product.quantity,
        };
    });

    const priceWithoutDollar = parseFloat(req.body.price.replace('$', ''));

    const recipeID = req.body.id;

    const newRecipeData ={
        name: req.body.name,
        cost: req.body.cost,
        price: priceWithoutDollar,
        products: newProductData,
        recipeNumber: req.body.recipeNumber,

    }

    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            recipeID,
            { newRecipeData },
            { new: true }
        );

        if(!updatedRecipe) {
            res.status(404).json({ message: 'Recipe not found.' });
            return;
        }

        res.status(201).json(updatedRecipe);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}