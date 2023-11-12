// productSchema.ts
import { ObjectId } from "mongodb";
import mongoose, {  Model, Schema, Document } from "mongoose";

//const mongoose = require('mongoose');

// Define Schema
const recipieSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    sku: {type: Number, required: true},
    products:{type:[ObjectId],required:true},
    description: {type: String, required: false}
});

export interface IRecipie extends Document {
    name: string;
    price: number;
    sku: number;
    products:[ObjectId];
    description?: string;
}

const Recipie: Model<IRecipie> = mongoose.model<IRecipie>('RecipieCollection', recipieSchema);

export default Recipie;
