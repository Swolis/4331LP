import productButtonSchema,{IPButton} from "./productButtonSchema";

import mongoose, {  Schema, Document, Model, Types, Connection } from "mongoose";

const subGroupSchema: Schema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{type:String,required:true},
    button:{type:[productButtonSchema],required:true},
    
});

export interface ISubGroup{
    _id:string
    name:string
    button:[IPButton]
}


export const getSubGroupModel = (clientInfo: any) => {
    const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
  
    const { databaseName } = clientInfo;
    const connection = mongoose.createConnection(uri, {
      dbName: databaseName,
      ssl: true,
    });

    const SubGroupModel: Model<ISubGroup> = connection.model<ISubGroup>('subgroup', subGroupSchema);

      
    const closeConnection = () => {
        connection.close()
          .then(() => {
            console.log('Connection closed successfully.');
          })
          .catch((error) => {
            console.error('Error closing the connection:', error);
          });
    };

    return { model: SubGroupModel, closeConnection };
}

export default subGroupSchema