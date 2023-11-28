import { Request, Response } from 'express';
import { getRecipeModel } from "../../models/inventoryModels/recipieSchema";

export const findProductIDController = async (req: Request, res: Response): Promise<void> => {
   console.log('entering product search controller');

   const { model:RecipieModel, closeConnection }=await getRecipeModel((req as any).session.client);

   const query:string = req.body.query;

   console.log(`query: ${query}`);
   try {

      let searchResult;
      searchResult=await RecipieModel.findById(query);
   
      if(searchResult== undefined){
         console.log('no product found');
         res.status(404).json({message: 'product no found'});
         
         return;
      }

      res.status(201).json(searchResult);
      
   }catch (error: any) {
      console.log('error: ', error);
      res.status(500).json({ message: `Internal server error: ${error}`});
   } finally {
      closeConnection();
   }


}