"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ExpressApp.js
/*
    Responsible for express applications
*/
var express = require('express');
var tokenExtractor_1 = require("./middleware/tokenExtractor");
var DatabaseNameGen_1 = require("./middleware/DatabaseNameGen");
var ConnectToClientListMiddleware_1 = require("./middleware/ConnectToClientListMiddleware");
var AuthenticateUserMiddleware_1 = require("./middleware/AuthenticateUserMiddleware");
var AddClientToListMiddleware_1 = require("./middleware/AddClientToListMiddleware");
var DisconnectListOfClientsMiddleware_1 = require("./middleware/DisconnectListOfClientsMiddleware");
var expressAppRouter_1 = require("./routes/expressAppRouter");
require('dotenv').config();
var app = express();
console.log('created app instance');
app.use(express.json());
app.use(ConnectToClientListMiddleware_1.ConnectToClientListMiddleWare); // Connect to list of database names *meta database*
app.use(DatabaseNameGen_1.DatabaseNameGen); // Genrerates database name when client signs up
app.use(AddClientToListMiddleware_1.AddClientToListMiddleware);
app.use(AuthenticateUserMiddleware_1.AuthenicateUserMiddleware); // verifies and authenticates client login
app.use(tokenExtractor_1.tokenExtractor); // Grabs database name to connect to client database
app.use(DisconnectListOfClientsMiddleware_1.DisconnectFromClientList); // * future task* app.use(DisconnectFromClientList); if /Admin-Login or /Admon-Registration disconnect from client list
// * future task* app.use(ConnectToClientMiddleWare); connect to client specific database;
console.log('after token extractor');
console.log('database name from express app: ', app.locals.databaseName);
app.use('/', expressAppRouter_1.default); // funnel all routes to the route tree
// Define the port number you want to use
var PORT = process.env.PORT || 3000; // You can choose the default port (3000) or use an environment variable
var server = require('./httpsServer');
// Start the server
server.listen(PORT, function () {
    console.log("Server is running on https://localhost:".concat(PORT));
});
module.exports = app;
