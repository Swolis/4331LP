import { Request, Response } from 'express'
import { createProduct } from '../../repositories/inventoryRepositories/productRepository';
import { Connection, Model } from 'mongoose';
import clientSchema, { IClient, getClientModel } from '../../models/ClientSchema';
import { Inventory, InventoryConfig } from '../../models/inventoryModels/inventorySchema';

export const createProductController = async ( req: Request, res: Response): Promise<void> => {
    console.log('entering create product controller');
    try {

        const ClientModel = getClientModel(req.app.locals.client);
        // const clientDatabase: Connection = req.app.locals.client;
        // const ClientModel: Model<IClient> = clientDatabase.model<IClient>('Client', clientSchema);
        const client = await ClientModel.findOne({});

        if (!client){
            throw new Error('user not found');
        }
        const orderID: number = client.nextOrderID++;
        await client.save();

        

        req.body.orderID = orderID;

        const inventoryConfig: InventoryConfig = {
            innerPack: req.body.innerPackDef,
            each: req.body.eachDef,
        }

        const inventory: Inventory = {
            case: req.body.caseQt,
            innerPack: req.body.innerPackQt,
            each: req.body.eachQt,
        }

        const productData = {
            name: req.body.name,
            price: req.body.price,
            sku: req.body.sku,
            description: req.body.description,
            inventoryConfig: inventoryConfig,
            inventory: inventory,
        };

        console.log('productData:', JSON.stringify(productData, null, 2));

        const newProduct = await createProduct(req.app.locals.client, productData);

        res.status(201).json(newProduct);

    } catch (error: any) {
        if(error.message === 'user not found'){
            res.status(404).json({message: 'Database error: ', error});
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message});
    }
}   