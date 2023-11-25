import itemSchema,{IItem} from "./itemSchema";
import { Schema } from "mongoose";


const orderSchema= new Schema<IOrder>({
    employeeID:{type:String,required:true},
    orderID:{type:Number, required:true},
    date:{type:String,required:true},
    listOfItems:{type:[itemSchema],required:true},
    totalPrice:{type:Number,required:true}


});
export interface IOrder extends Document{
    employeeID:string
    orderID:number
    date:string
    listOfItems:[IItem]
    totalPrice:number
}
export default orderSchema