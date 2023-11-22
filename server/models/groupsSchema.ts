// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";
import buttonSchema from "./buttonSchema";
// Define Schema

const subGroupSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    button:{type:[String],required:true},
    
});

export interface ISubGroup{
    name:string
    button:[string]
}


const groupSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    button:{type:String,required:true},
    groups:{type:[subGroupSchema],required:false}
});


export interface IGroup extends Document {
    name:string
    button:[string]
    groups:[string]
   
}

export default groupSchema;