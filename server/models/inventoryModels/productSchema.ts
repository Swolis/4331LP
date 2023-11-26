// productSchema.ts
import mongoose, {  Schema, Document, Connection, Model } from "mongoose";

import inventoryConfigSchema, {InventoryConfig, Inventory} from "./inventorySchema";


// Define Schema


export interface IProduct extends Document {
    name: string,
    price: number,
    sku: number,
    description?: string,
}
const productSchema= new Schema<IProduct>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    sku: {type: Number, required: true},
    description: {type: String, required: false},

    inventoryConfig: {type: inventoryConfigSchema, required: true},
    inventory: {type: Object, required: true},

});


export interface IProduct extends Document {
    name: string;
    price: number;
    sku: number;
    description?: string;
    inventoryConfig: InventoryConfig;
    inventory: Inventory;
}

export const getProductModel = (clientInfo: any): any => {
    const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
  
    const { databaseName } = clientInfo;
    const connection = mongoose.createConnection(uri, {
      dbName: databaseName,
      ssl: true,
    });

    const ProductModel: Model<IProduct> = connection.model<IProduct>('products', productSchema);

      
    const closeConnection = () => {
        connection.close()
          .then(() => {
            console.log('Connection closed successfully.');
          })
          .catch((error) => {
            console.error('Error closing the connection:', error);
          });
    };

    return { model: ProductModel, closeConnection };
}


export default productSchema;
