import { Request, Response } from 'express';

import recipieSchema, { IRecipe } from "../../models/inventoryModels/recipieSchema";
import { Model, Connection } from 'mongoose';

export const findRecipieIDController = async (req: Request, res: Response): Promise<void> => {


   // use connection
   const clientDatabase: Connection = req.app.locals.client;
    
   // use product model
   const RecipieModel: Model<IRecipe> = clientDatabase.model<IRecipe>('recipie', recipieSchema);

   const query:string = req.body.query;

   console.log(`query: ${query}`);
   try {

      let searchResult;
      searchResult=await RecipieModel.findById(query)

     
   
      if(searchResult== null){
         console.log('no recipie found');
         res.status(404).json({message: 'recipie no found'});
         return;
      }
   
      res.status(201).json(searchResult);

   }catch (error: any) {
      console.log('error: ', error);
      res.status(500).json({ message: `Internal server error: ${error}`});
   }


}