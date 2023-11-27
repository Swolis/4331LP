// createClientController.ts
/*
    Adds new clinet to main database
*/
import { createClient } from '../repositories/clientRepository';
export const createClientController = async (req, res) => {
    try {
        const clientData = req.body;
        req.body.userId = null;
        const newClient = await createClient(clientData);
        //newClient.userId = newClient._id;
        await newClient.save();
        // Set the HTTP response status code
        res.status(201);
        // Use the json() method to send the response with JSON data
        res.json(newClient);
    }
    catch (error) {
        console.error('Error adding client: ', error);
    }
};
// function test() {
//     const testObject = {
//         body: {
//             username: 'testUser',
//             password: 'password',
//             email: 'test@email.com',
//             phone: 1111111111,
//             address: '123 test drive address',
//             // _id added by controller
//             products:[],
//         },
//     };
//     const testRes = {
//         body: {
//             username: 'testUser',
//             password: 'password',
//             email: 'test@email.com',
//             phone: 1111111111,
//             address: '123 test drive address',
//             userId: mongoose.Schema.Types.ObjectId,
//             products:[],
//         },
//     };
//     createClientController(testObject, testRes);
// }
