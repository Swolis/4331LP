const express = require('express');
const fs = require('fs')
const https = require('https');  // Change from 'https' to 'http'
const path = require('path');

const app = express();

https
  .createServer{
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
