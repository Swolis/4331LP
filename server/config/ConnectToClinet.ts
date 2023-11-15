// databaseConnection.ts

import mongoose, { Connection } from "mongoose";

const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';

// Create an array to store multiple connections
const connections: Connection[] = [];

export function connectToClient(databaseName: string): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
        try {
            // Always use the second connection or create a new one if not present
            const connectionIndex = 1;
            const connection = connections[connectionIndex] || mongoose.createConnection();

            await connection.openUri(uri, { dbName: databaseName, ssl: true });

            console.log(`Connected to the database on connection[${connectionIndex}]`);
            connections[connectionIndex] = connection;

            resolve(connection); // resolve with the database instance
        } catch (error) {
            console.error('Error connecting to the database: ', error);
            reject(error); // reject with the error
        }
    });
}
