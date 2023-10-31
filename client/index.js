// index.js

const express = require('express');
const app = express();

const server = require('./httpsServer.js');

const PORT = process.env.PORT || 3000;

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use((req, res, next) => {
    res.send('Welcome to Express');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});