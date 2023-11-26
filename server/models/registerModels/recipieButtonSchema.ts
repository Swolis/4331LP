// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

// Define Schema
const recipieButtonSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    recipieID:{ type: String, ref: 'recipie', required:true },
    x: {type: Number, required: true},
    y: {type: Number, required: true},
   

});

export interface IRButton extends Document {
    name: string;
    recipieID:string;
    x: number;
    y: number;
   
}

export default recipieButtonSchema;
