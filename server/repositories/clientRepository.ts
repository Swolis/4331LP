// clientRepository.ts
import clientSchema, { IClient } from '../models/ClientSchema';
import mongoose, { Model, Connection } from 'mongoose';

const uri = "mongodb+srv://buisnessInABox:GZW2YHtng2qNTMUo@cluster0.jvawjrm.mongodb.net/?retryWrites=true&w=majority";

export const createClient: (userData: any, databaseName: string) => Promise<{ user: IClient }> = async (userData, databaseName) => {
    try {

        // Create a new connection for the client's database
        const clientDatabase: Connection = mongoose.createConnection(uri, { dbName: databaseName, ssl: true });

        // Explicitly create a model using the client's schema and the new connection
        const Client: Model<IClient> = clientDatabase.model<IClient>('Client', clientSchema);


        // Create a new User instance in the specified database
        const newUser = new Client(userData);

        // Save the user data to the specified database
        const savedUser = await newUser.save();

        return { user: savedUser };
    } catch (error) {
        console.error('Error during user creation:', error);
        throw new Error('Failed to create user.');
    }
};
