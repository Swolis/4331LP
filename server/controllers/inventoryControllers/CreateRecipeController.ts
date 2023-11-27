import { Request, Response } from 'express';
import { createRecipe } from '../../repositories/inventoryRepositories/recipeRepository';
import { getClientModel } from '../../models/ClientSchema';
import { Types } from 'mongoose';
import { ProductTrackerInterface } from '../../models/inventoryModels/recipieSchema';

export const createRecipeController = async ( req: Request, res: Response): Promise<void> => {
    console.log(`\n\nEntering create Recipe controller`);
    try {
        const ClientModel = getClientModel((req as any).session.client);
        
        const client = await ClientModel.findOne({});

        if(!client) { 
            throw new Error ('User not found');
        }
        const recipeNumber: number = client.nextRecipe++;
        await client.save();


        console.log('recipeNumber: ', recipeNumber);
        req.body.recipeNumber = recipeNumber;

        console.log(
            req.body.products.map((product: any) => ({
              productId: product.id,
              name: product.name,
              quantity: product.quantity,
            }))
          );

          
          const products: ProductTrackerInterface = req.body.products.map((product: any) => {
            const isValid = Types.ObjectId.isValid(product.id);
            console.log(`Id: ${product.id}`)
            console.log(`Is valid ObjectId: ${isValid}`);
            return {
                productId: product.id,
                name: product.name,
                quantity: product.quantity,
            };
        });      

        const priceWithoutDollar = parseFloat(req.body.price.replace('$', ''));

        const recipeData = {
            name: req.body.name,
            cost: req.body.cost,
            price: priceWithoutDollar,
            products: products,
            description: req.body.description,
            recipeNumber: recipeNumber,
        }

        const newRecipe = await createRecipe(req.app.locals.client, recipeData);

        res.status(201).json({ message: ' Created new Recipe', newRecipe });
    }catch (error: any) {
        console.error(`Error createing recipe: ${error.message}`);
        res.status(500).json({message: `Internal server error`});
    }
    
}
