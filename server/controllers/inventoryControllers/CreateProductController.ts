import { Request, Response } from 'express'
import { createProduct } from '../../repositories/inventoryRepositories/productRepository';
import { getClientModel } from '../../models/ClientSchema';
import { Inventory, InventoryConfig } from '../../models/inventoryModels/inventorySchema';

export const createProductController = async ( req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> => {
    console.log('entering create product controller');
    try {

        const { model: ClientModel, closeConnection} = getClientModel((req as any).session.client);

        const client = await ClientModel.findOne({});

        if (!client){
            throw new Error('user not found');
        }
        const sku: number = client.nextSKU++;
        await client.save();

        console.log(`sku: ${sku}`);

        req.body.sku = sku;

        closeConnection();
        
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

        const newProduct = await createProduct((req as any).session.client, productData);

        return res.status(201).json(newProduct);

    } catch (error: any) {
        console.log('error: ', error)
        if(error.message === 'user not found'){
            console.log('user not found');
           return  res.status(404).json({message: 'Database error: ', error});
        }
       return res.status(500).json({ message: 'Internal Server Error', error: error.message});
    }
}   