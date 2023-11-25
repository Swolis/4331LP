const express = require('express');
const cors = require('cors');
const session = require('express-session');
const https = require('https');  // Import the 'https' module
const fs = require('fs');  // Import the 'fs' module
const path = require('path');
const CORS_1 = require("./middleware/CORS");
const DatabaseNameGen_1 = require("./middleware/DatabaseNameGen");
const ConnectToClientListMiddleware_1 = require("./middleware/ConnectToClientListMiddleware");
const AuthenticateUserMiddleware_1 = require("./middleware/AuthenticateUserMiddleware");
const AddClientToListMiddleware_1 = require("./middleware/AddClientToListMiddleware");
const DisconnectListOfClientsMiddleware_1 = require("./middleware/DisconnectListOfClientsMiddleware");
const ConnectToClientDatabaseMiddleware_1 = require("./middleware/ConnectToClientDatabaseMiddleware");
const expressAppRouter_1 = require("./routes/expressAppRouter");
const app = express();


console.log('created app instance');
app.use(cors(CORS_1.corsConfig));
console.log('took update7.');
app.use(express.json());
app.use(ConnectToClientListMiddleware_1.ConnectToClientListMiddleWare);
app.use(DatabaseNameGen_1.DatabaseNameGen);
app.use(AddClientToListMiddleware_1.AddClientToListMiddleware);
app.use(session({
    secret: 'temp-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000,
    }
}));

    require('dotenv').config({ path: __dirname + '/.env' });
    console.log('secret_key', process.env.SECRET_KEY);


app.use(AuthenticateUserMiddleware_1.AuthenicateUserMiddleware);
app.use(DisconnectListOfClientsMiddleware_1.DisconnectFromClientList);
app.use(ConnectToClientDatabaseMiddleware_1.ConnectToClinetDatabaseMiddleware);


app.get('/', function (req, res) {
    res.send('Hello, this is the root path!');
});

app.use('/', expressAppRouter_1.default);

// Use the 'https' module to create an HTTPS server

const privateKey = fs.readFileSync('/etc/letsencrypt/live/businesscraft.work/privkey.pem', 'utf8');
const cert = fs.readFileSync('/etc/letsencrypt/live/businesscraft.work/fullchain.pem', 'utf8');
console.log(`private key: ${privateKey}`);
console.log(`cert: ${cert}`);
const server = https.createServer({
    key: privateKey,  // Path to your private key
    cert: cert,  // Path to your certificate
}, app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log("Server is running on https://localhost:".concat(PORT));
});

module.exports = app;
