
import productSchema, { IProduct } from '../models/productSchema';
import clientSchema,{IClient} from '../models/ClientSchema';
import mongoose, { Model, Connection } from 'mongoose';

import { Schema, model} from 'mongoose';
import { connectToClient } from '../config/ConnectToClinet';

const uri = "mongodb+srv://buisnessInABox:GZW2YHtng2qNTMUo@cluster0.jvawjrm.mongodb.net/";

export const createProduct: ( ProductData: any,databaseName:string) => Promise<IProduct> = async (ProductData: any,databaseName:string) => {
    var clientDatabase= mongoose.createConnection(uri+databaseName)
    
    
    console.log(ProductData)
    const Product=clientDatabase.model<IProduct>('Products', productSchema);
    
    const newProduct= new Product(ProductData)
    
    await newProduct.save()
    
    clientDatabase.close()
    return newProduct;
}



