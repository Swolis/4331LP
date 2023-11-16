import { Request, Response } from 'express'
import { createProduct } from '../../repositories/inventoryRepositories/productRepository';
import { Connection, Model } from 'mongoose';
import clientSchema, { IClient } from '../../models/ClientSchema';

export const createProductController = async ( req: Request, res: Response): Promise<void> => {
    console.log('entering create product controller');
    try {
        const clientDatabase: Connection = req.app.locals.client;
        const ClientModel: Model<IClient> = clientDatabase.model<IClient>('Client', clientSchema);
        const client = await ClientModel.findOne({});

        if (!client){
            throw new Error('user not found');
        }
        const sku: number = client.nextSKU++;
        await client.save();

        console.log(`sku: ${sku}`);

        req.body.sku = sku;

        const productData = {
            name: req.body.name,
            price: req.body.price,
            sku: req.body.sku,
            description: req.body.description,
        };
        console.log('productData:', JSON.stringify(productData, null, 2));

        const newProduct = await createProduct(clientDatabase, productData);

        res.status(201).json(newProduct);

    } catch (error: any) {
        if(error.message === 'user not found'){
            res.status(404).json({message: 'Database error: ', error});
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message});
    }
}   