import productSchema, { IProduct } from '../../models/inventoryModels/productSchema';
import clientSchema,{IClient} from '../../models/ClientSchema'
import mongoose, { Model, Connection } from 'mongoose';
const uri = "mongodb+srv://buisnessInABox:GZW2YHtng2qNTMUo@cluster0.jvawjrm.mongodb.net/?retryWrites=true&w=majority/";
 async function findProduct (ProductSearch:any,databaseName:string,SKU:any,req:any) {

    const clientDatabase: Connection = await mongoose.createConnection(uri, { dbName: databaseName, ssl: true });
    //let db=req.app.locals.client
    
    //console.log(clientDatabase)
    const Products: Model<IProduct> = clientDatabase.model<IProduct>('Products', productSchema);
    console.log("hi")
   const searchableFields=  await Products.findOne({name:{ProductSearch}})
   
    return searchableFields;
 }
 async function main(){
const x= await findProduct('Cheese','test4',1,'a')

console.log(`result:${x}`)}
main()