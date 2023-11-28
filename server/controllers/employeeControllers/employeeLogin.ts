
import { Request, Response } from 'express';
import employeeSchema,{IEmployee,getEmployeeModel} from '../../models/employee/employeeSchema';
import { Model, Connection } from 'mongoose';
import { getClientModel } from '../../models/ClientSchema';

export const EmployeeLoginController = async (req: Request, res: Response): Promise<void> => {
   

    
   // use employeeModel
   const{model: EmployeeModel,closeConnection}=getEmployeeModel((req as any).session.client)

   const query:string= req.body.query;
   closeConnection()
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

     
   
      if(searchResult.length === 0){
         console.log('no employee found');
         closeConnection()
         res.status(404).json({message: 'employee not found'});
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
