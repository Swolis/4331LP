import productSchema,{IProduct} from "../inventoryModels/productSchema";
import recipeSchema,{IRecipe} from "../inventoryModels/recipieSchema";
import { Schema } from "mongoose";

const recipieOrNotSchema=new Schema<IRecipeORNOT>({
    iDOfItem:{type:String,required:true},
    isRecipe:{type:Boolean,required:true}
})

interface IRecipeORNOT extends Document{
    iDOfItem:string
    isRecipe:boolean
}
const orderSchema= new Schema<IOrder>({
    orderID:{type:Number, required:true},
    date:{type:String,required:true},
    listOfItems:{type:[recipieOrNotSchema],required:true},
    totalPrice:{type:Number,required:true}


});
export interface IOrder extends Document{
    orderID:number
    date:string
    listOfItems:[IRecipeORNOT]
    totalPrice:number
}
export default orderSchema