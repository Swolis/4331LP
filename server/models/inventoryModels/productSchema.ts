// productSchema.ts
import mongoose, {  Schema, Document } from "mongoose";

// Define Schema


export interface IProduct extends Document {
    name: string,
    price: number,
    sku: number,
    description?: string,
}
const productSchema= new Schema<IProduct>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    sku: {type: Number, required: true},
    description: {type: String, required: false},


});
export default productSchema;
