// AddClientToListMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import ListClientSchema, { IListClient } from '../models/listOfClients/ClientListSchema';
import mongoose, { Model } from 'mongoose';
const bcrypt = require('bcrypt');
const saltRounds: number = 12;

export const AddClientToListMiddleware = async (req: Request, res: Response, next: NextFunction) =>
{
    console.log('Entering add client to list middleware');

    if(!(req.url === '/Admin-Registration' && req.method === 'POST'))
    {
        console.log('Add Client not apllicable');
        next();
        return;
    }
    
    console.log('AddClientToList is applicable');

    // validate data
    const {username, password, databaseName} = req.body;

    if(!( username && password )){
        console.log('Username, and password required.');
        return res.status(400).json({ message: 'Username, and password required.'});
    }

    if(!databaseName){
        console.log('Database name not generated.');
        throw new Error('Database name not generated.');
    }

    try
    {
        // hash password
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);

        // creat object
        const newClientData = 
        {
            username: username,
            hashedPassword: hashedPassword,
            databaseName: databaseName,

        };

        const ListClientModel: Model<IListClient> = mongoose.model<IListClient>('ClientList', ListClientSchema);


        const newClient: IListClient = new ListClientModel(newClientData);
        // store new client
        await newClient.save();

        // proceed to next funciton
        next();

    }catch (error: any)
    {
        console.log('caught error: ', error);
        return res.status(500).json({ message: `Internal server error: ${error}.` });
    }
}