// productSchema.ts
import mongoose, {  Model, Schema, Document } from "mongoose";

//const mongoose = require('mongoose');

// Define Schema
const productSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    sku: {type: Number, required: true},
    description: {type: String, required: false}
});

export interface IProduct extends Document {
    name: string;
    price: number;
    sku: number;
    description?: string;
}

export default productSchema;
