const express = require('express');
const http = require('http');  // Change from 'https' to 'http'
const path = require('path');

const app = express();

try {
  const server = http.createServer(app);  // Remove 'options' parameter

  module.exports = server;
} catch (error) {
  console.log('error setting up server');
  console.error('Error setting up HTTP server:', error);
}
