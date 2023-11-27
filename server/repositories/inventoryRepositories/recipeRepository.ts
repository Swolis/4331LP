import { Connection, Model } from 'mongoose';
import recipeSchema, { IRecipe, getRecipeModel } from "../../models/inventoryModels/recipieSchema";

export const createRecipe: (connection: Connection, recipeData: any) => Promise<IRecipe> = async (connection: Connection, recipeData: any) => {
    try {
        const RecipeModel = getRecipeModel(connection);
        const newRecipe = new RecipeModel(recipeData);
    
        await newRecipe.save();
    
        return newRecipe;
    } catch (error: any) {
        console.error('Error createing recipe: ', error);
        throw new Error('Internal Server Error');
    }
}