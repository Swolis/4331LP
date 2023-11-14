import { Request, Response, NextFunction } from 'express';
import { Connection, Model } from 'mongoose';
import clientSchema, { IClient } from '../../models/ClientSchema';

export const AdminLoginController = async (req: Request, res: Response, next: NextFunction) => {
  console.log('\n\nentering set settion from controller');


    try {
        const client: Connection = await (req as any).app.locals.client;
        const ClientModel: Model<IClient> = client.model<IClient>('Client', clientSchema);

        const data = await ClientModel.find({}).exec();
        console.log('Data from the "client" collection:', data);

        if (Array.isArray(data) && data.length > 0) {
            (req as any).session.userID = data[0]._id;
            res.status(200).json({ message: 'Login Successful' });
            return; // Add this return statement
        } else {
            throw new Error('Invalid user data');
        }
    } catch (error: any) {
        console.error('Error handling setSession middleware:', error);
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
        res.end(); // Ensure response is ended even if there's an error
    }
};
