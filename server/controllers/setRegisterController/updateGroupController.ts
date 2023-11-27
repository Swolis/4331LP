import {Request, Response} from 'express'
import { getClientModel } from '../../models/ClientSchema';
import groupSchema,{IGroup,getGroupModel} from '../../models/registerModels/groupsSchema';
import subGroupSchema,{ISubGroup,getSubGroupModel} from '../../models/registerModels/subGroupSchema';

export const updateSubGroups = async ( req: Request, res: Response): Promise<void> => {
    
    try {
        const { model: ClientModel, closeConnection }: any = getClientModel((req as any).session.client);
        
        const client = await ClientModel.findOne({});
        

        if(!client) { 
            throw new Error ('User not found');
        }
        
        await client.save();
        closeConnection()
        const { model: GroupModel, closeConnection2 }: any = getSubGroupModel((req as any).session.client);
        let findGroup=GroupModel.findById(req.body.group.groupID)
        if (findGroup==null){
            res.status(404).json({message: 'No group found.'});
            return;
        }
        findGroup.name=req.body.group.name
        await findGroup.save()
        findGroup.button= req.body.group.button
        await findGroup.save()
       


        closeConnection2()
        
       
        res.status(201).json({ message: ' Group Updated',findGroup });
    }catch (error: any) {
        console.error(`Error updating Group: ${error.message}`);
        res.status(500).json({message: `Internal server error`});
    }
    
}
