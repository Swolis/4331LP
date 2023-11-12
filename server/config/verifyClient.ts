// verifyClients.ts
import mongoose from 'mongoose';
import {connectToListOfClients} from "./connectToListOfClients";
import ListClientModel, { IListClient } from '../models/listOfClients/listOfClientsSchema';


const username: string = 'test';

connectToListOfClients(username)
    .then(async (client: typeof mongoose) => {
    // Verify client exists and find the target database
    try {
        const targetDatabase: IListClient | null = await findTargetDatabase(username);
  
        if (targetDatabase) {
          console.log('Found client with username:', targetDatabase.username);
          console.log('Database name:', targetDatabase.databaseName);
        } else {
          console.log('Client with username does not exist.');
        }
      } catch (error) {
        console.error('Error verifying client:', error);
      }
    });

async function findTargetDatabase(username: string) {
    return await ListClientModel.findOne({ username }).exec();
}