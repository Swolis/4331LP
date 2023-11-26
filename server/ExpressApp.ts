const express = require('express');
const cors = require('cors');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const path = require('path');
const redis = require('redis');
const connectRedis = require('connect-redis');
import { corsConfig } from './middleware/CORS';
import { DatabaseNameGen } from './middleware/DatabaseNameGen';
import { ConnectToClientListMiddleWare } from './middleware/ConnectToClientListMiddleware';
import { AuthenicateUserMiddleware } from './middleware/AuthenticateUserMiddleware';
import { AddClientToListMiddleware } from './middleware/AddClientToListMiddleware';
import { DisconnectFromClientList } from './middleware/DisconnectListOfClientsMiddleware';
import { ConnectToClinetDatabaseMiddleware } from './middleware/ConnectToClientDatabaseMiddleware';

import mainRouter from './routes/expressAppRouter';

const app = express();
console.log('created app instance');

app.use(cors(corsConfig));

console.log('took update7.');
app.use(express.json());
app.use(ConnectToClientListMiddleWare);
app.use(DatabaseNameGen);
app.use(AddClientToListMiddleware);




const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutes
      secure: true,
      httpOnly: true,
      sameSite: 'Lax' // or 'Strict'
    },
    store: new RedisStore({ client: redisClient }) // Assuming you have a Redis client
  })
);



require('dotenv').config( { path: __dirname + '/.env' });
console.log('secret_key', process.env.SECRET_KEY);


app.use(AuthenicateUserMiddleware);
app.use(DisconnectFromClientList);

app.get('/', (req: any, res: any) => {
  res.send('Hello, this is the root path!');
});

app.use((req: any, res: any, next: any) => {
  console.log('the session variables two: ', req.session);
  next();
});

app.use('/', mainRouter);

const PORT = process.env.PORT || 5000;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/businesscraft.work/privkey.pem', 'utf8');
const cert = fs.readFileSync('/etc/letsencrypt/live/businesscraft.work/fullchain.pem', 'utf8');
console.log(`private key: ${privateKey}`);
console.log(`cert: ${cert}`);
const server = https.createServer(
  {
    key: privateKey,
    cert: cert,
  },
  app
);

server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

export default app;

