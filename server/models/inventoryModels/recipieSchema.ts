// productSchema.ts

import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

//const mongoose = require('mongoose');

// Define Schema
const recipieSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    RecipeID: { type: Number, required: true },
    products:{ type: Types.ObjectId, ref: 'Product', required:true },
    description: { type: String }
});

export interface IRecipie extends Document {
    name: string;
    price: number;
    sku: number;
    products:[];
    description?: string;
}

export const createRecipeModel = (connection: Connection) => {
    return connection.model<IRecipie>('Recipe', recipieSchema);
}


export default recipieSchema;
