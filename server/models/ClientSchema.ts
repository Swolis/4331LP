// clientSchema.ts
import { Schema, Document, Model } from "mongoose";
import mongoose from 'mongoose';


const clientSchema: Schema = new mongoose.Schema({
    username: {type: String, unique: true, required: true },
    buisnessName: { type: String, required: true },
    email: {type: String, unique: true, required: true },
    phone: {type: String, unique: true, required: true },
    address: {type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId },
    
    defaultPin: { type: Boolean, default: true },
    nextSKU: { type: Number, default: 1 },
    nextRecipe: { type: Number, default: 1 },
    nextEmployeeID:{type:Number,default:1},
    nextOrderID:{type:Number,default:1},

});

clientSchema.pre('save', function(next) {
    if (!this.userId) {
        this.userId = this._id;
    }
    next();
});

export interface IClient extends Document {
    username: string;
    buisnessName: string;
    email: string;
    phone: String;
    address: string;
    userId: mongoose.Types.ObjectId;

    defaultPin: boolean;
    nextSKU: number;
    nextRecipe: number;
    nextEmployeeID:number
}

 

export const getClientModel = (clientInfo: any): any => {
    const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
  
    const { databaseName } = clientInfo;
    const connection = mongoose.createConnection(uri, {
      dbName: databaseName,
      ssl: true,
    });
  
    const ClientModel: Model<IClient> = connection.model<IClient>('Client', clientSchema);
  
    const closeConnection = () => {
      connection.close()
        .then(() => {
          console.log('Connection closed successfully.');
        })
        .catch((error) => {
          console.error('Error closing the connection:', error);
        });
    };
  
    return { model: ClientModel, closeConnection };
  };




export default clientSchema;