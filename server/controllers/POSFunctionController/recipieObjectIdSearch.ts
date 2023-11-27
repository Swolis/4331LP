import { Request, Response } from 'express';
import { getClientModel } from '../../models/ClientSchema';
import recipieSchema, { IRecipe,getRecipeModel } from "../../models/inventoryModels/recipieSchema";
import { Model, Connection } from 'mongoose';

export const findProductIDController = async (req: Request, res: Response): Promise<void> => {
   console.log('entering product search controller');

   // use connection
   
    
   // use product model
   const {model:RecipieModel,closeConnection}=await getRecipeModel((req as any).session.client)

   const query:string = req.body.query;

   console.log(`query: ${query}`);
   try {

      let searchResult;
      searchResult=await RecipieModel.findById(query)

     
   
      if(searchResult== undefined){
         console.log('no product found');
         closeConnection()
         res.status(404).json({message: 'product no found'});
         
         return;
      }
      closeConnection()
      res.status(201).json(searchResult);
      
   }catch (error: any) {
      console.log('error: ', error);
      closeConnection()
      res.status(500).json({ message: `Internal server error: ${error}`});
   }


}