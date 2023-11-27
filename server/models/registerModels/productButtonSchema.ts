// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

// Define Schema
const productButtonSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    productID:{ type: String, ref: 'product', required:true },
    x: {type: Number, required: true},
    y: {type: Number, required: true},
   

});

export interface IPButton extends Document {
    name: string;
    productID:string;
    x: number;
    y: number;
   
}

export default productButtonSchema;
