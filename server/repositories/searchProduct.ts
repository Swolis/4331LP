
import productSchema, { IProduct } from '../models/productSchema';
import clientSchema,{IClient} from '../models/ClientSchema';
import mongoose, { Model, Connection } from 'mongoose';
const uri = "mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/";
export async function findProduct (user: IClient, ProductSearch:string,databaseName:string,SKU:number) {
    const clientDatabase: Connection = mongoose.createConnection(uri, { dbName: databaseName, ssl: true });
    const Product: Model<IProduct> = clientDatabase.model<IProduct>('Product', productSchema);
   const searchableFields= await Promise.all([ Product.find({name:ProductSearch}), Product.find({sku:SKU})])
    if(searchableFields==null){
        return null
    }    
    else{
        return searchableFields
    }
}