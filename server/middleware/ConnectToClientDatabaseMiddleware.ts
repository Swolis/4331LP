// ConnectToClientDatabaseMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { connectToClient } from '../config/ConnectToClinet';
import mongoose from 'mongoose';

export const ConnectToClinetDatabaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log('entering connect to client database');

    try {
        const client = await connectToClient((req as any).session.databaseName);
        req.app.locals.client = client;

        console.log('Client database connected successfully');

        // Set up session middleware with MongoStore
        const MongoStore = require('connect-mongo')(require('express-session'));
        const sessionMiddleware = require('express-session')({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: client }),
            cookie: {
                maxAge: 30 * 60 * 1000, // Adjust as needed
            },
        });
        next();
    } catch ( error: any ) {
        console.error('Error connecting to client database: ', error);
        return res.status(500).json({ message: 'Error connecting to Client Database.' });    }
}