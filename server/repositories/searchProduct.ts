
import productSchema, { IProduct } from '../models/productSchema';
import clientSchema,{IClient} from '../models/ClientSchema';
import mongoose, { Model, Connection } from 'mongoose';
import { MongoClient } from 'mongodb';

 export async function findProduct (ProductSearch:string,databaseName:string,SKU:number,req:any) {
   const uri = "mongodb+srv://buisnessInABox:GZW2YHtng2qNTMUo@cluster0.jvawjrm.mongodb.net/";
   
   var clientDatabase= mongoose.createConnection(uri+databaseName)
    
    
    
    const Product=clientDatabase.model<IProduct>('Products', productSchema);
//returns list of all finds that we wanna do
  const result=Promise.all([await Product.find({name:ProductSearch}),await Product.find({sku:SKU})])
   
   
   clientDatabase.close()
    return result;
   
 }
