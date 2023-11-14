"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var CORS_1 = require("./middleware/CORS");
//import { tokenExtractor } from './middleware/tokenExtractor';
var DatabaseNameGen_1 = require("./middleware/DatabaseNameGen");
var ConnectToClientListMiddleware_1 = require("./middleware/ConnectToClientListMiddleware");
var AuthenticateUserMiddleware_1 = require("./middleware/AuthenticateUserMiddleware");
var AddClientToListMiddleware_1 = require("./middleware/AddClientToListMiddleware");
var DisconnectListOfClientsMiddleware_1 = require("./middleware/DisconnectListOfClientsMiddleware");
var ConnectToClientDatabaseMiddleware_1 = require("./middleware/ConnectToClientDatabaseMiddleware");
//import { setSession } from './middleware/setSessionMiddleware';
var expressAppRouter_1 = require("./routes/expressAppRouter");
require('dotenv').config();
var app = express();
console.log('created app instance');
app.use(cors(CORS_1.corsConfig));
console.log('took update7.');
app.use(express.json());
//app.use(loggingMiddleware);
app.use(ConnectToClientListMiddleware_1.ConnectToClientListMiddleWare);
app.use(DatabaseNameGen_1.DatabaseNameGen);
app.use(AddClientToListMiddleware_1.AddClientToListMiddleware);
app.use(session({
    secret: 'temp-secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(AuthenticateUserMiddleware_1.AuthenicateUserMiddleware);
//app.use(tokenExtractor);
app.use(DisconnectListOfClientsMiddleware_1.DisconnectFromClientList);
app.use(ConnectToClientDatabaseMiddleware_1.ConnectToClinetDatabaseMiddleware);
//app.use(setSession);
app.get('/', function (req, res) {
    res.send('Hello, this is the root path!');
});
app.use('/', expressAppRouter_1.default);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
module.exports = app;
