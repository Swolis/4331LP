const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

try {
  const keyPath = path.join(__dirname, 'key.pem');
  const certPath = path.join(__dirname, 'cert.pem');

  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    passphrase: 'zelda'
  };

  const server = https.createServer(options, app);

  module.exports = server;
} catch (error) {
  console.error('Error setting up HTTPS server:', error);
}
