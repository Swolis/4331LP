
import recipieSchema, { IRecipie } from '../models/recipieSchema';
import clientSchema,{IClient} from '../models/ClientSchema';
import mongoose, { Model, Connection } from 'mongoose';
const uri = "mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/";
export const createRecipie: (user: IClient, RecipieData: any,databaseName:string) => Promise<IRecipie> = async (user: IClient, RecipieData: any,databaseName:string) => {
    const clientDatabase: Connection = mongoose.createConnection(uri, { dbName: databaseName, ssl: true });
    const Recipie: Model<IRecipie> = clientDatabase.model<IRecipie>('Recipie', recipieSchema);
    
    const newRecipie=new Recipie(RecipieData);
    await user.save();
    return newRecipie;
}