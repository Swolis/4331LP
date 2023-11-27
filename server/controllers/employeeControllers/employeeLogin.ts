
import { Request, Response } from 'express';
import employeeSchema,{IEmployee,getEmployeeModel} from '../../models/employee/employeeSchema';
import { Model, Connection } from 'mongoose';

export const findProductController = async (req: Request, res: Response): Promise<void> => {
   

   // use connection
   const clientDatabase: Connection = req.app.locals.client;

    
   // use product model
   const { model: EmployeeModel, closeConnection }: any= getEmployeeModel(clientDatabase)

   const query:string= req.body.query;

   console.log(`query: ${query}`);
   try {

      let searchResult;
      if(typeof(query) === 'string'){
         console.log('query is a string');
         searchResult = await EmployeeModel.findOne({
            pin:query
        });
      }else{
         throw new Error('search type invalid');
      }

     
   
      if(searchResult== null){
         console.log('no employee found');
         res.status(404).json({message: 'employee not found'});
         return;
      }
      closeConnection();
      res.status(201).json(searchResult);

   }catch (error: any) {
      console.log('error: ', error);
      res.status(500).json({ message: `Internal server error: ${error}`});
   }


}
