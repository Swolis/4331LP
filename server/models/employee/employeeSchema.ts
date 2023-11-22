// productSchema.ts
import mongoose, {  Schema, Document } from "mongoose";

// Define Schema


export interface IEmployee extends Document {
    name: string,
    pin: string,
    employeeId:string
    permission:boolean
}
const employeeSchema= new Schema<IEmployee>({
    name: {type: String, required: true},
    pin:{type:String,required:true},
    employeeId:{type:String,reaquired:true},
    permission:{type:Boolean,required:true}


});
export default employeeSchema;