// databaseConnection.ts

import mongoose from "mongoose";

const uri:string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/test';

async function connectToClient(uriEnd: String): Promise<typeof mongoose>
{
    try{
        await mongoose.connect(uri+uriEnd, {
            ssl: true,
        })
        console.log('Connected to the database');
        //console.log('client: ', mongoose);
        return mongoose; // return database instance
    }catch (error) {
        console.error('Error connecting to database: ', error);
        throw error;
    }
}


export { connectToClient }