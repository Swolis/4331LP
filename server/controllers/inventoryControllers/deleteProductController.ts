import { findProductIDController } from "../POSFunctionController/productObjectIdSearch";
import {Connection}from "mongoose"

import { Request, Response } from 'express';
import {Model} from 'mongoose';
import recipeSchema, {IRecipe, getRecipeModel} from '../../models/inventoryModels/recipieSchema';
import productSchema ,{ getProductModel, IProduct} from '../../models/inventoryModels/productSchema';
import { productTrackerSchema,ProductTrackerInterface } from "../../models/inventoryModels/recipieSchema";
export  const deleteProductController=async (req:Request,res:Response):Promise<void> => {
    const clientDatabase: Connection = req.app.locals.client;
    var findproductId=req.body.productId
    var findProduct=findProductIDController(req,res)
    if(findProduct==null){
        console.log('no recipie found');
        res.status(404).json({message: 'recipie no found'});
        return;
    }
    const RecipeModel: Model<IRecipe> = getRecipeModel(req.app.locals.client);
    const ammountOfRecipies=await RecipeModel.count()
    const trackerModel:Model<ProductTrackerInterface>=clientDatabase.model<ProductTrackerInterface>('recipies',productTrackerSchema)
    
    for await(const product of trackerModel.findById(findproductId)){
        await product.deleteOne()
    }
    
    const ProductModel: Model<IProduct> = clientDatabase.model<IProduct>('products', productSchema);

}