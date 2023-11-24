import mongoose, {Schema, Document } from "mongoose";

const ListClientSchema: Schema = new mongoose.Schema({
    username: {type: String, required: true},
    hashedPassword: {type: String, required: true},
    databaseName: {type: String, unique: true, required: true},
},{
    collection: 'ClientList' // Add this line to specify the collection name
});


export interface IListClient extends Document {
    username: string;
    hashedPassword: string;
    databaseName: string;
}

export default ListClientSchema;