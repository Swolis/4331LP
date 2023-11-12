import { Request, Response, NextFunction } from 'express';
import { connectToListOfClients } from '../config/connectToListOfClients';
import mongoose from 'mongoose';

export const ConnectToClientListMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Entering ConnectToClientList middleware');
    if (!(req.url === '/Admin-Login' || req.url === '/Admin-Registration') && req.method === 'POST') {
        console.log('ConnectToClientList not applicable: ', req.url, 'method: ', req.method);
        return next(); // Return here to avoid further execution
    }

    try {
        let numConnections = mongoose.connections.length;
        console.log(`Number of open connections before connect: ${numConnections}`);

        const client = await connectToListOfClients();
        req.app.locals.client = client;

        numConnections = mongoose.connections.length;
        console.log(`Number of open connections after connect: ${numConnections}`);

        next();
    } catch (error) {
        console.error('Connection to List Of Clients: ', error);
        return res.status(500).json({ message: 'Error connecting to List Of Clients Database.' });
    }
};
