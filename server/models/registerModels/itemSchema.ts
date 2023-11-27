// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

// Define Schema
const itemSchema: Schema = new mongoose.Schema({
    
    recipieID:{ type: String, ref: 'recipie', required:true },
    
    mod:{type:[String],ref:'products',required:false}

});

export interface IItem extends Document {
    recipieID:string;
    mod:[string];//product IDS 
}




export default itemSchema;
