
import { Request, Response } from 'express';
import productSchema, { IProduct } from "../../models/inventoryModels/productSchema";
import { Model, Connection } from 'mongoose';

export const findProductController = async (req: Request, res: Response): Promise<void> => {
   console.log('entering product search controller');

   // use connection
   const clientDatabase: Connection = req.app.locals.client;

    
   // use product model
   const ProductModel: Model<IProduct> = clientDatabase.model<IProduct>('products', productSchema);

   const query:string | number = req.body.query;

   console.log(`query: ${query}`);
   try {

      let searchResult;
      if(typeof(query) === 'string'){
         console.log('query is a string');
         searchResult = await ProductModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
            ],
        });
      }else if(typeof(query) === 'number'){

         if(query === 0){
            searchResult = await ProductModel.find({});
         }else{
            console.log('query is a number');
            searchResult = await ProductModel.find({
               $or: [
                   { price: query },
                   { sku: query },
               ],
           });
         }

      }else{
         throw new Error('search type invalid');
      }

     
   
      if(searchResult.length === 0){
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
