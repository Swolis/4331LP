const { createProductController } = require("./CreateProductController");
const { main } = require ("../services/skuService");

const {jest} = require 'jest';

// Define a function to fetch the sku value asynchronously
const fetchSku = async () => {
  try {
    const sku = await main(); // Replace with your actual asynchronous logic
    return sku;
  } catch (error) {
    console.error('Error fetching sku:', error);
    throw error;
  }
};

const mockReq = {
  body: {
    name: 'Test Product',
    price: 19.99,
    description: 'Test product',
  },
};

fetchSku()
  .then((sku) => {
    mockReq.body.sku = sku;
  })
  .then(() => {
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    // Call the controller function with the mock objects
    createProductController(mockReq, mockRes);

    // Check the response sent by the controller
    console.log('Response from the controller:');
    console.log(mockRes.status.mock.calls); // View the status code set
    console.log(mockRes.json.mock.calls); // View the JSON data sent
  });
