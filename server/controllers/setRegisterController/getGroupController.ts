import {Request, Response} from 'express'
import groupSchema,{IGroup,getGroupModel} from '../../models/registerModels/groupsSchema';
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
        const { model: GroupModel, closeConnection2 }: any = getGroupModel((req as any).session.client);
        let getGroups= await GroupModel.find({})
        if (getGroups.length===0){
            closeConnection2()
            res.status(404).json({message: 'No group found.'});
            return;
        }
        
       


        
        closeConnection2()
       
        res.status(201).json({ getGroups });
    }catch (error: any) {
        console.error(`Error createing order: ${error.message}`);
        
        res.status(500).json({message: `Internal server error`});
    }
    
}