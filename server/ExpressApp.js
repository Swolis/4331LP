// ExpressApp.js
/*
    Responsible for express applications
*/
import { Express } from 'express';
const { connectToDatabase } = require('./config/databaseConnection');
import mainRouter from './routes/expressAppRouter';


const app = Express.express();

// Connect to database when appliction starts
connectToDatabase()
    .then((client) => {
        // make client available to the rest of the application
        app.locals.client = client;

        console.log('app.locals.client: ', app.locals.client);
    })
    .catch((error) => {
        console.error('Database connection error: ', error);
    });

app.use('/routes', mainRouter);

// Define the port number you want to use
const PORT = process.env.PORT || 3000; // You can choose the default port (3000) or use an environment variable
const server = require('./httpsServer')

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });
  

