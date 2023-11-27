// ListOfClientsMiddleware.ts
/*
    Connects to List of clients database then go next, which is the router, assuming this file is used we are woring with
    rhw url /Admin-login, the next function will be the rout to the AdminLoginController whci will store the user name and databaseName in
    a secure httpOnly cookie
*/

import { Request, Response, NextFunction } from 'express';
import { connectToListOfClients } from '../config/connectToListOfClients';
import mongoose from 'mongoose';


export const ListOfClientsMiddleware = async (req: Request, res: Response, next: NextFunction) =>
{
    console.log('Entering List of Clients middleware');
    if(!(req.url === '/Admin-Login' || req.method === 'POST')){
        next();
    }

    connectToListOfClients()
    .then(async (client: typeof mongoose) => {
        req.app.locals.client = client;

        next();
    })
    .catch((error) => {
        console.error('Connection to List Of Clients: ', error);
    })

}