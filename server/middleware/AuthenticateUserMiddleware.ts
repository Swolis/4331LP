// AuthenicateUserMiddleware.ts
/*Used to check datbase to authenticate user*/

import { Request, Response, NextFunction } from 'express';
import ListClientSchema, { IListClient } from '../models/listOfClients/ClientListSchema';
import mongoose, {Model} from 'mongoose';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const AuthenicateUserMiddleware = async (req: Request, res: Response, next: NextFunction) =>
{
    console.log('Entering Authentication middleware');
    console.log(`method: ${req.method}`);
    console.log(`url: ${req.url}`);

    if(!(req.url === '/Admin-Login' && req.method === 'POST'))
    {
        console.log('Authentication Middleware not applicable');
        next();
        return;
    }

    let oauthProvidedEmail=''

    console.log('isVerified: ', req.body.isVerified);
    if(req.body.isVerified){
        oauthProvidedEmail = (req as any).body.email;
    }

    console.log('Authentication is applicable')
    console.log('req.body: ', req.body);

    const EnteredUsername = await req.body.username;
    const EnteredPassword = await req.body.password;

    console.log(`u: ${EnteredUsername} p: ${EnteredPassword}`);

    try
    {
        const ListClientModel: Model<IListClient> = mongoose.model<IListClient>('ClientList', ListClientSchema);

        const user: any = await ListClientModel.findOne({ 
            $or : [
                {username: EnteredUsername},
                {email: oauthProvidedEmail},
        
            ],
        });
        const collectionName: string = ListClientModel.collection.name;
        console.log('collection name: ', collectionName);
        console.log(user);

        if(!user){
            console.log('user not found: ', user);
            return res.status(401).json({ messahe: 'Username not found' });
        }else{
            console.log('is user')
        }

        let isMatch: boolean = false;

        if(!req.body.isVerified){
            isMatch = await bcrypt.compare(EnteredPassword, user.hashedPassword);
        }
         
        // just for testing, the password is not hashed
        //const isMatch = (EnteredPassword === user.hashedPassword);
        


        if (isMatch || oauthProvidedEmail.length > 0){
            console.log('passwords match');
            const SecretKey = 'SecretKey';
            const token = jwt.sign({ databaseName: user.databaseName}, SecretKey);
            //(res as any).headers.authorization = token;
            
           // console.log('from authorization: req.headers.authorization: ', req.headers.authorization);
            (req as any).session.databaseName = user.databaseName;
            (req as any).session.email = user.email;

            (req as any).session.client = {
                databaseName: (req as any).session.databaseName,
                // other relevant information
            };

            await (req as any).session.save();
            next();
        }else{
            console.log('passwords dont match');
            return res.status(401).json({ message: 'Access Denied'});
        }
    }catch (error: any) {
        return res.status(500).json({ message: 'Internal sever error.' });
    }


}