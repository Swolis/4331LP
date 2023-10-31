const { createProductController } = require('./CreateProductController');
const express = require('express');
const { connectToDatabase } = require ( '../config/databaseConnection');

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


test('Test createProductController', async () => {
  const mockReq = {
    body: {
      name: 'second Test Product',
      price: 22.99,
      description: 'Test product',
    },
  };

  const mockRes = {
    status: jest.fn(),
    json: jest.fn(),
  };

  await createProductController(mockReq, mockRes);

  // Add your assertions here
  expect(mockRes.status).toHaveBeenCalledWith(201); // Expected status code
  expect(mockRes.json).toHaveBeenCalledWith(/* Expected JSON data */);
}, 20000);
