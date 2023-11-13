const express = require('express');
const cors = require('cors');
import { corsConfig } from './middleware/CORS';
//import { loggingMiddleware } from './middleware/loggingMiddleware';
import { tokenExtractor } from './middleware/tokenExtractor';
import { DatabaseNameGen } from './middleware/DatabaseNameGen';
import { ConnectToClientListMiddleWare } from './middleware/ConnectToClientListMiddleware';
import { AuthenicateUserMiddleware } from './middleware/AuthenticateUserMiddleware';
import { AddClientToListMiddleware } from './middleware/AddClientToListMiddleware';
import { DisconnectFromClientList } from './middleware/DisconnectListOfClientsMiddleware';
import mainRouter from './routes/expressAppRouter';

require('dotenv').config();

const app = express();
console.log('created app instance');


// app.options('*', (req: any, res: any) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.status(204).end();
// });

app.use(cors(corsConfig));

console.log('took update7.');
app.use(express.json());
//app.use(loggingMiddleware);
app.use(ConnectToClientListMiddleWare);
app.use(DatabaseNameGen);
app.use(AddClientToListMiddleware);
app.use(AuthenicateUserMiddleware);
app.use(tokenExtractor);
app.use(DisconnectFromClientList);

app.get('/', (req: any, res: any) => {
    res.send('Hello, this is the root path!');
});

app.use('/', mainRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
