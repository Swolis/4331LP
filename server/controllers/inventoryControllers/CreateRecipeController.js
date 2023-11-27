import { createRecipe } from '../../repositories/inventoryRepositories/recipeRepository';
import { getClientModel } from '../../models/ClientSchema';
import { Types } from 'mongoose';
export const createRecipeController = async (req, res) => {
    console.log(`\n\nEntering create Recipe controller`);
    try {
        const ClientModel = getClientModel(req.session.client);
        const client = await ClientModel.findOne({});
        if (!client) {
            throw new Error('User not found');
        }
        const recipeNumber = client.nextRecipe++;
        await client.save();
        console.log('recipeNumber: ', recipeNumber);
        req.body.recipeNumber = recipeNumber;
        console.log(req.body.products.map((product) => ({
            productId: product.id,
            name: product.name,
            quantity: product.quantity,
        })));
        const products = req.body.products.map((product) => {
            const isValid = Types.ObjectId.isValid(product.id);
            console.log(`Id: ${product.id}`);
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
        };
        const newRecipe = await createRecipe(req.app.locals.client, recipeData);
        res.status(201).json({ message: ' Created new Recipe', newRecipe });
    }
    catch (error) {
        console.error(`Error createing recipe: ${error.message}`);
        res.status(500).json({ message: `Internal server error` });
    }
};
