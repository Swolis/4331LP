// clientSchema.ts
import { Schema, Document, Connection, Model } from "mongoose";
import mongoose from 'mongoose';


const clientSchema: Schema = new mongoose.Schema({
    username: {type: String, unique: true, required: true },
    buisnessName: { type: String, required: true },
    email: {type: String, unique: true, required: true },
    phone: {type: String, unique: true, required: true },
    address: {type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId },
    
    managerDefaultPin: { type: Boolean, default: true },
    nextSKU: { type: Number, default: 1 },
    nextRecipe: { type: Number, default: 1 },
    nextEmployeeID:{type:Number,default:1}

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
    managerDefaultPin: boolean;
    nextSKU: number;
    nextRecipe: number;
    nextEmployeeID:number
}

export const getClientModel = (connection: Connection): Model<IClient> => {
    return connection.model<IClient>('Client', clientSchema);
}

// const User: Model<IUser> = mongoose.model<IUser>('Client', userSchema);

export default clientSchema;