// DisconnectListOfClientsMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { appendFile } from 'fs';
import mongoose from 'mongoose';

export const DisconnectFromClientList = async (req: Request, res: Response, next: NextFunction) =>
{
    console.log('\nEntering disconnect from client list');
    if(
        !(req.url === '/Admin-Login' || req.url === '/Admin-Registration') ||
        !(req.method === 'POST')
    ){
        console.log('DisconnectFromClientList not applicable.');
        return next();
    }

    try
    {
        let numConnections = mongoose.connections.length;
        console.log(`Number of open connections: ${numConnections}`);
        console.log(`about to close: " ${req.app.locals.client.connection.name}`);
        await req.app.locals.client.connection.close();
        console.log(`closed connection to list:  ${req.app.locals.client.connection.name}`);

        numConnections = mongoose.connections.length;
        console.log(`Number of open connections: ${numConnections}`);

        if (req.app.locals.client.connection.readyState === 0) {
            console.log(`closed connection to list: ${req.app.locals.client.connection.name}`);
        } else {
            console.log('Failed to close the connection.');
        }

        next();
    }catch(error: any){
        console.log('had error diconnecting');
        return res.status(500).json({ message: 'Error disconnecting from Client List Database.' });
    }
}