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

export const getProductModel = (connection: Connection): Model<IProduct> => {
    return connection.model<IProduct>('products', productSchema);
}


export default productSchema;
