// databaseConnection.ts


import { MongoClient } from 'mongodb';

const punycode = require('punycode/');

const uri:string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/?retryWrites=true&w=majority';
const client:MongoClient = new MongoClient(uri);


async function connectToDatabase(): Promise<MongoClient>
{
    try{
        await client.connect();
        console.log('Connected to the database');
        return client; // return database instance
    }catch (error) {
        console.error('Error connecting to database: ', error);
        throw error;
    }finally{
        //await client.close();
    }
}


export { connectToDatabase, client };