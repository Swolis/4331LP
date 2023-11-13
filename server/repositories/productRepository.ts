
import productSchema, { IProduct } from '../models/productSchema';
import clientSchema,{IClient} from '../models/ClientSchema';
import mongoose, { Model, Connection } from 'mongoose';
const uri = "mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/";
export const createProduct: (user: IClient, ProductData: any,databaseName:string) => Promise<IProduct> = async (user: IClient, ProductData: any,databaseName:string) => {
    const clientDatabase: Connection = mongoose.createConnection(uri, { dbName: databaseName, ssl: true });
    const Product: Model<IProduct> = clientDatabase.model<IProduct>('Product', productSchema);
    
    const newProduct=new Product(ProductData);
    await user.save();
    return newProduct;
}