import { Request, Response } from 'express';

import productSchema, { IProduct } from "../../models/inventoryModels/productSchema";
import { Model, Connection } from 'mongoose';

export const findProductIDController = async (req: Request, res: Response): Promise<void> => {
   console.log('entering product search controller');

   // use connection
   const clientDatabase: Connection = req.app.locals.client;
    
   // use product model
   const ProductModel: Model<IProduct> = clientDatabase.model<IProduct>('products', productSchema);

   const query:string = req.body.query;

   console.log(`query: ${query}`);
   try {

      let searchResult;
      searchResult=await ProductModel.findById(query)

     
   
      if(searchResult== null){
         console.log('no product found');
         res.status(404).json({message: 'product no found'});
         return;
      }
   
      res.status(201).json(searchResult);

   }catch (error: any) {
      console.log('error: ', error);
      res.status(500).json({ message: `Internal server error: ${error}`});
   }


}