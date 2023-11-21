// productSchema.ts

import { ObjectId } from "mongodb";
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

//const mongoose = require('mongoose');

// Define Schema
const recipieSchema: Schema = new Schema<IRecipie>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    recipieid:{type:Number,required:true},
    products:{type:[String],required:true},
    description: { type: String }
});

export interface IRecipie extends Document {
    name: string;
    price: number;
    recipieid: number;
    products:[string];
    description?: string;
}

export const createRecipeModel = (connection: Connection) => {
    return connection.model<IRecipie>('Recipe', recipieSchema);
}


export default recipieSchema;
