const { createClientController } = require('./createClientController'); // Adjust the import path as needed
const { createUser } = require('../repositories/clientRepository'); // Import any necessary repository functions
const User = require('../models/ClientSchema'); // Import your User model

const express = require('express');
const { connectToDatabase } = require ( '../config/databaseConnection');
const { JsxEmit } = require('typescript');

const app = express();

app.set('port', 3001);

connectToDatabase()
    .then((client) => {
        // make client available to the rest of the application
        app.locals.client = client;

       // console.log('app.locals.client: ', app.locals.client);
    })
    .catch((error) => {
        console.error('Database connection error: ', error);
    });

afterAll(async () => {
    app.locals.client.connection.close();
})


    test('Test createClientController', async () => {
        const mockReq = {
            body: {
                username: 'testUser',
                password: 'password',
                email: 'test@email.com',
                phone: 1111111111,
                address: '123 test drive address',
                products: [],
            },
        };
    
        const mockRes = {
            status: jest.fn(),
            json: jest.fn(),
        };
    
        await createClientController(mockReq, mockRes);
    
        // Use toMatchObject to check the JSON data with expected properties
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({
                "__v": 0,
                "address": "123 test drive address",
                "email": "test@email.com",
                "password": "password",
                "phone": 1111111111,
                "products": [],
                "username": "testUser"
            })
        );
    }, 20000);
    
    
