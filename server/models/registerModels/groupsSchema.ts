// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";
import recipieButtonSchema,{IRButton} from "./recipieButtonSchema";
import productButtonSchema,{IPButton} from "./productButtonSchema";
// Define Schema

const subGroupSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    button:{type:[productButtonSchema],required:true},
    
});

export interface ISubGroup{
    name:string
    button:[string]
}


const groupSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    button:{type:[recipieButtonSchema],required:true},
    groups:{type:[subGroupSchema],required:false}
});


export interface IGroup extends Document {
    name:string
    button:[IRButton]
    groups:[ISubGroup]
   
}

export default groupSchema;