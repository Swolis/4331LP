// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";
import buttonSchema,{IButton} from "./buttonSchema";
// Define Schema

const subGroupSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    button:{type:[buttonSchema],required:true},
    
});

export interface ISubGroup{
    name:string
    button:[string]
}


const groupSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    button:{type:[buttonSchema],required:true},
    groups:{type:[subGroupSchema],required:false}
});


export interface IGroup extends Document {
    name:string
    button:[IButton]
    groups:[ISubGroup]
   
}

export default groupSchema;