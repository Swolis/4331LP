import mongoose, { Model } from "mongoose";
import ListClientSchema, { IListClient } from "../models/listOfClients/ClientListSchema";

const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/ClinetListDatabase';

async function connectToListOfClients(): Promise<typeof mongoose> {
    try {
        await mongoose.connect(uri, {
            ssl: true,
        });

        console.log('Connected to the list of clients');

        const ClientListModel: Model<IListClient> = mongoose.model<IListClient>('ClientList', ListClientSchema);

        const targetCollection = ClientListModel.collection.name;
        console.log('Querying collection:', targetCollection);
        
        // List all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(collection => collection.name));

        // Query the "ClientList" collection
        const listOfClients = await ClientListModel.find();
        console.log('ClientList documents:', targetCollection);

        // Continue with your logic, e.g., call the login controller to verify the password

        return mongoose; // return the database instance
    } catch (error) {
        console.error('Error connecting to the database: ', error);
        throw error;
    }
}

export { connectToListOfClients };
