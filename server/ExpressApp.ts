const express = require('express');
const cors = require('cors');
const session = require('express-session');
import { corsConfig } from './middleware/CORS';
//import { tokenExtractor } from './middleware/tokenExtractor';
import { DatabaseNameGen } from './middleware/DatabaseNameGen';
import { ConnectToClientListMiddleWare } from './middleware/ConnectToClientListMiddleware';
import { AuthenicateUserMiddleware } from './middleware/AuthenticateUserMiddleware';
import { AddClientToListMiddleware } from './middleware/AddClientToListMiddleware';
import { DisconnectFromClientList } from './middleware/DisconnectListOfClientsMiddleware';
import { ConnectToClinetDatabaseMiddleware } from './middleware/ConnectToClientDatabaseMiddleware';
//import { setSession } from './middleware/setSessionMiddleware';
import mainRouter from './routes/expressAppRouter';

if (process.env.NODE_ENV !== 'production') {
    
    require('dotenv').config( { path: __dirname + '/.env' });

}else {
    console.log('NOT using dotenv');
}

const app = express();
console.log('created app instance');


app.use(cors(corsConfig));


console.log('took update7.');
app.use(express.json());
//app.use(loggingMiddleware);
app.use(ConnectToClientListMiddleWare);
app.use(DatabaseNameGen);
app.use(AddClientToListMiddleware);

app.use(session({
    secret: 'temp-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000,
    }
}));

app.use(AuthenicateUserMiddleware);
//app.use(tokenExtractor);
app.use(DisconnectFromClientList);

app.use(ConnectToClinetDatabaseMiddleware);

//app.use(setSession);

app.get('/', (req: any, res: any) => {
    res.send('Hello, this is the root path!');
});

app.use('/', mainRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
