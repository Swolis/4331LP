import {Request, Response} from 'express'
import groupSchema,{IGroup,getGroupModel} from '../../models/registerModels/groupsSchema';
import subGroupSchema,{getSubGroupModel} from '../../models/registerModels/subGroupSchema';
import { getClientModel } from '../../models/ClientSchema';
import { createSubGroup} from '../../repositories/registerRepositories/setRegister';


export const getGroups = async ( req: Request, res: Response): Promise<void> => {
    
    try {
        const { model: ClientModel, closeConnection }: any = getClientModel((req as any).session.client);
        
        const client = await ClientModel.findOne({});
        

        if(!client) { 
            throw new Error ('User not found');
        }
        
        await client.save();
        closeConnection()
        const { model: SubGroupModel, closeConnection2 }: any = getSubGroupModel((req as any).session.client);
        let getSubGroups= await SubGroupModel.find({})
        if (getSubGroups.length===0){
            closeConnection2()
            res.status(404).json({message: 'No group found.'});
            return;
        }
        
       


        
        closeConnection2()
       
        res.status(201).json({ getSubGroups });
    }catch (error: any) {
        console.error(`Error createing order: ${error.message}`);
        
        res.status(500).json({message: `Internal server error`});
    }
    
}