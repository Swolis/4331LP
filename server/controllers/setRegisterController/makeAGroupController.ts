import {Request, Response} from 'express'

import { getClientModel } from '../../models/ClientSchema';
import { createGroup } from '../../repositories/registerRepositories/setRegister';



export const establishGroup = async ( req: Request, res: Response): Promise<void> => {
    
    try {
        const { model: ClientModel, closeConnection }: any = getClientModel((req as any).session.client);
        const client = await ClientModel.findOne({});

        if(!client) { 
            throw new Error ('User not found');
        }
        
        await client.save();
        
        const groupSchema = {
            name: req.body.group.name,
            button:req.body.group.buttons,
            group:null
        }

        const newGroup = await createGroup(req.app.locals.client, groupSchema);
        closeConnection()
        res.status(201).json({ message: ' Created new Order', newGroup });
    }catch (error: any) {
        console.error(`Error createing order: ${error.message}`);
        res.status(500).json({message: `Internal server error`});
    }
    
}
