// ExpressApp.js
/*
    Responsible for express applications
*/
const express = require('express');

import { tokenExtractor } from './middleware/tokenExtractor';
import { DatabaseNameGen } from './middleware/DatabaseNameGen';
import { ConnectToClientListMiddleWare } from './middleware/ConnectToClientListMiddleware';
import { AuthenicateUserMiddleware } from './middleware/AuthenticateUserMiddleware';
import { AddClientToListMiddleware } from './middleware/AddClientToListMiddleware';
import { DisconnectFromClientList } from './middleware/DisconnectListOfClientsMiddleware';
import mainRouter from './routes/expressAppRouter';


require('dotenv').config();

const app = express();console.log('created app instance');
app.use(express.json());
app.use(ConnectToClientListMiddleWare); // Connect to list of database names *meta database*
app.use(DatabaseNameGen); // Genrerates database name when client signs up
app.use(AddClientToListMiddleware);
app.use(AuthenicateUserMiddleware); // verifies and authenticates client login
app.use(tokenExtractor); // Grabs database name to connect to client database
app.use(DisconnectFromClientList)// * future task* app.use(DisconnectFromClientList); if /Admin-Login or /Admon-Registration disconnect from client list
// * future task* app.use(ConnectToClientMiddleWare); connect to client specific database;
console.log('after token extractor');
console.log('database name from express app: ', app.locals.databaseName);

app.use('/', mainRouter); // funnel all routes to the route tree



// Define the port number you want to use
const PORT = process.env.PORT || 3000; // You can choose the default port (3000) or use an environment variable
const server = require('./httpsServer')

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });
  module.exports = app;
  

