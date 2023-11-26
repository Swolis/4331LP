// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

// Define Schema
const buttonSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    recipieID:{ type: String, ref: 'recipie', required:true },
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    mod:{type:String,ref:'products',required:true}

});

export interface IButton extends Document {
    name: string;
    recipieID:string;
    mod:[string];//product IDS
    x: number;
    y: number;
   
}

export default buttonSchema;