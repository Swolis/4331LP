"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var https = require('https');
var fs = require('fs');
var path = require('path');
var CORS_1 = require("./middleware/CORS");
var DatabaseNameGen_1 = require("./middleware/DatabaseNameGen");
var ConnectToClientListMiddleware_1 = require("./middleware/ConnectToClientListMiddleware");
var AuthenticateUserMiddleware_1 = require("./middleware/AuthenticateUserMiddleware");
var AddClientToListMiddleware_1 = require("./middleware/AddClientToListMiddleware");
var DisconnectListOfClientsMiddleware_1 = require("./middleware/DisconnectListOfClientsMiddleware");
var ConnectToClientDatabaseMiddleware_1 = require("./middleware/ConnectToClientDatabaseMiddleware");

var MongoStore = require('connect-mongo')(session);

var expressAppRouter_1 = require("./routes/expressAppRouter");
var app = express();
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
    },
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
var PORT = process.env.PORT || 5000;
var privateKey = fs.readFileSync('/etc/letsencrypt/live/businesscraft.work/privkey.pem', 'utf8');
var cert = fs.readFileSync('/etc/letsencrypt/live/businesscraft.work/fullchain.pem', 'utf8');
console.log("private key: ".concat(privateKey));
console.log("cert: ".concat(cert));
var server = https.createServer({
    key: privateKey,
    cert: cert,
}, app);
server.listen(PORT, function () {
    console.log("Server is running on https://localhost:".concat(PORT));
});
exports.default = app;
