import {Request, Response} from 'express'
import groupSchema,{IGroup,getGroupModel} from '../../models/registerModels/groupsSchema';
import { getClientModel } from '../../models/ClientSchema';
import { createSubGroup} from '../../repositories/registerRepositories/setRegister';


export const establishSubGroup = async ( req: Request, res: Response): Promise<void> => {
    
    try {
        const { model: ClientModel, closeConnection }: any = getClientModel((req as any).session.client);
        
        const client = await ClientModel.findOne({});

        if(!client) { 
            throw new Error ('User not found');
        }
        
        await client.save();
        closeConnection()
        const { model: GroupModel, closeConnection2 }: any = getGroupModel((req as any).session.client);
        let findGroup = await GroupModel.findById(req.body.groupID)
        if (findGroup === null){
            closeConnection2()
            res.status(404).json({message: 'No group found.'});
            return;
        }
        const subGroupSchema = {
            name: req.body.group.subgroups.name,
            button:req.body.group.buttons,
        }

        const newGroup = await createSubGroup((req as any).session.client, subGroupSchema);
        let gID=newGroup._id
        await findGroup.groups.add(gID)
        await findGroup.save()
        
        closeConnection2();
       
        res.status(201).json({ message: 'Created new Order', newGroup });
    }catch (error: any) {
        console.error(`Error createing order: ${error.message}`);
        
        res.status(500).json({message: `Internal server error`});
    }
    
}
