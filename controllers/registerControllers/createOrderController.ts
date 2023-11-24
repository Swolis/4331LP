import {Request, Response} from 'express'

import { getClientModel } from '../../models/ClientSchema';
import { createOrder } from '../../repositories/orderRepositories/makeAnOrder';


export const createOrderController = async ( req: Request, res: Response): Promise<void> => {
    console.log(`\n\nEntering create Recipe controller`);
    try {
        const ClientModel = getClientModel(req.app.locals.client);
        const client = await ClientModel.findOne({});

        if(!client) { 
            throw new Error ('User not found');
        }
        const orderNumber: number = client.nextOrderID++;
        await client.save();
        let itemCount=req.body.itemCount;
        let itemArray=[itemCount]
        req.body.orderNumber = orderNumber;
        req.body.date=new Date().toString()
        let modsize
        let itemData
        for(let ammountOfItems=0;ammountOfItems<itemCount;ammountOfItems++){
            modsize=req.body.mod[ammountOfItems].length
            let modArray=[modsize]
            for(let ammountOfMods=0;ammountOfMods<modsize;ammountOfMods++){
                modArray[ammountOfMods]=req.body.modID[ammountOfItems][ammountOfMods]
            }
            itemData={
                recipieID:req.body.recipieID[ammountOfItems],
                mod:modArray
            }
            itemArray[ammountOfItems]=itemData

        }

          
            


        const orderData = {
            employeeID: req.body.employeeID,
            orderID:req.body.orderNumber,
            date:req.body.date,
            listOfItems: itemData,
            totalPrice: req.body.totalPrice,
        }

        const newOrder = await createOrder(req.app.locals.client, orderData);

        res.status(201).json({ message: ' Created new Order', newOrder });
    }catch (error: any) {
        console.error(`Error createing order: ${error.message}`);
        res.status(500).json({message: `Internal server error`});
    }
    
}
