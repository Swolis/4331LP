import mongoose, { Schema, Document, Types } from "mongoose";


export const productTrackerSchema: Schema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: {type: String, required: true },
    quantity: { type: Number, required: true },
});


export interface ProductTrackerInterface {
    productId: string;
    name: string;
    quantity: number;
}


const recipeSchema: Schema = new mongoose.Schema({

    name: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },

    recipeNumber: { type: Number, required: true },
    products: [{ type: productTrackerSchema, required: true }],

    description: { type: String }
});

export interface IRecipe extends Document {
    name: string;
    price: number;

    recipeNumber: number;
    products: ProductTrackerInterface[];

    description?: string;
}

export const getRecipeModel = (connection: mongoose.Connection) => {
    return connection.model<IRecipe>('Recipe', recipeSchema);
}


export default recipeSchema;