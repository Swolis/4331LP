// productSchema.ts
import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";
import recipieButtonSchema,{IRButton} from "./recipieButtonSchema";
import productButtonSchema,{IPButton} from "./productButtonSchema";
// Define Schema



const groupSchema: Schema = new mongoose.Schema({
    name:{type:String,required:true},
    button:{type:[recipieButtonSchema],required:true},
    groups:{type:[String],refrence:'subgroups',required:false}
});


export interface IGroup extends Document {
    name:string
    button:[IRButton]
    groups:[string]
   
}

export const getGroupModel = (clientInfo: any) => {
    const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
  
    const { databaseName } = clientInfo;
    const connection = mongoose.createConnection(uri, {
      dbName: databaseName,
      ssl: true,
    });

    const GroupModel: Model<IGroup> = connection.model<IGroup>('orders', groupSchema);

      
    const closeConnection = () => {
        connection.close()
          .then(() => {
            console.log('Connection closed successfully.');
          })
          .catch((error) => {
            console.error('Error closing the connection:', error);
          });
    };

    return { model: GroupModel, closeConnection };
}


export default groupSchema;