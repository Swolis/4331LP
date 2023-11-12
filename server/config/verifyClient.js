import { connectToListOfClients } from "./connectToListOfClients";
import ListClientModel from '../models/listOfClients/listOfClientsSchema';
const username = 'test';
connectToListOfClients(username)
    .then(async (client) => {
    // Verify client exists and find the target database
    try {
        const targetDatabase = await findTargetDatabase(username);
        if (targetDatabase) {
            console.log('Found client with username:', targetDatabase.username);
            console.log('Database name:', targetDatabase.databaseName);
        }
        else {
            console.log('Client with username does not exist.');
        }
    }
    catch (error) {
        console.error('Error verifying client:', error);
    }
});
async function findTargetDatabase(username) {
    return await ListClientModel.findOne({ username }).exec();
}
