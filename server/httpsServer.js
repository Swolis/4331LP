const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    passphrase: 'zelda'
};

const server = https.createServer(options, app);

module.exports = server;
