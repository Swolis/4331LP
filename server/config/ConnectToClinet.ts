// databaseConnection.ts

import mongoose, { Connection } from "mongoose";

const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';

export function connectToClient(databaseName: string): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = mongoose.createConnection(uri, {
                dbName: databaseName,

                ssl: true,
            });

            connection.on('connected', () => {
                console.log(`Connected to the database for ${databaseName}`);
                resolve(connection); // Resolve with the database instance
            });

            connection.on('error', (error) => {
                console.error('Error connecting to the database:', error);
                reject(error); // Reject with the error
            });
        } catch (error) {
            console.error('Error creating connection to the database: ', error);
            reject(error); // Reject with the error
        }
    });
}
