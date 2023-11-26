import {Request, Response} from 'express'
import { getClientModel } from '../../models/ClientSchema';

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
        const { model: subGroupModel, closeConnection2 }: any = getSubGroupModel((req as any).session.client);
        let findGroup=subGroupModel.findById(req.body.group.subgroups.group.groupID)
        if (findGroup==null){
            res.status(404).json({message: 'No group found.'});
            return;
        }
        findGroup.name=req.body.group.subgroups.group.name
        await findGroup.save()
        findGroup.button= req.body.group.subgroups.group.buttons
        await findGroup.save()
       


        closeConnection2()
        
       
        res.status(201).json({ message: ' Subgroup Updated',findGroup });
    }catch (error: any) {
        console.error(`Error updating subgroup: ${error.message}`);
        res.status(500).json({message: `Internal server error`});
    }
    
}
