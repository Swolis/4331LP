import { Request, Response, NextFunction } from 'express';
import { connectToClient } from '../config/ConnectToClinet';
import mongoose, { Connection } from 'mongoose';

export const ConnectToClinetDatabaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log('entering connect to client database');

    if(!(req.url === '/Admin-Login' || req.url === '/Admin-Registration')){
        console.log('Connect to ')
        return next();
    }
    try{
        console.log('connecting to: ', (req as any).session.databaseName);
        const client: Connection = await connectToClient((req as any).session.databaseName);
        (req as any).session.client = client;
        next();
    } catch ( error: any ) {
        console.error('Error connecting to client database: ', error);
        return res.status(500).json({ message: 'Error connecting to Client Database.' });    }
}