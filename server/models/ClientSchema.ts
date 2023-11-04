// clientSchema.ts
import { Model, Schema, Document } from "mongoose";
import Product, { IProduct } from './productSchema';
import mongoose from 'mongoose';


const userSchema: Schema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: Number, unique: true, required: true},
    address: {type: String, unique: true, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId},
    nextSKU: { type: Number, default: 1 },

    products: [Product.schema]
});

userSchema.pre('save', function(next) {
    if (!this.userId) {
        this.userId = this._id;
    }
    next();
});

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    phone: number;
    address: string;
    userId: mongoose.Types.ObjectId;
    nextSKU: number;
    products: IProduct[];
}

const User: Model<IUser> = mongoose.model<IUser>('Client', userSchema);

export default User;