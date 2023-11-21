// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

// Define Schema
const buttonSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    recipieID:{ type: String, ref: 'recipie', required:true },
    x: {type: Number, required: true},
    y: {type: Number, required: true},

});

export interface IButton extends Document {
    name: string;
    recipieID:string;
    x: number;
    y: number;
   
}

export default buttonSchema;
