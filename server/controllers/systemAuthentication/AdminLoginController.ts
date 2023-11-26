import { Request, Response, NextFunction } from 'express';
import { Connection, Model } from 'mongoose';
import clientSchema, { IClient } from '../../models/ClientSchema';
const jwt = require('jsonwebtoken');

export const AdminLoginController = async (req: Request, res: Response) => {
  console.log('\n\nentering set session from controller');

  try {
    const client: Connection = await (req as any).session.client;
    const ClientModel: Model<IClient> = client.model<IClient>('Client', clientSchema);

    console.log(`session stored email: ${(req as any).session.email}`);

    const data = await ClientModel.findOne({ email: (req as any).session.email }).lean().exec();
    console.log('Data from the "client" collection:', data);

    if (data) {
      const SecretKey = process.env.SECRET_KEY;
      console.log(`secret key: ${SecretKey}`);

      const token = jwt.sign({ userID: data._id }, SecretKey, { expiresIn: '120m' });
      console.log(`Generated token: ${token}`);

      res.cookie('authToken', token, { maxAge: 30 * 60 * 1000, httpOnly: false, secure: true });

      (req as any).session.authenticated = true;

      res.status(200).json({ message: 'Login Successful' });
      return;
    } else {
      const newData = await ClientModel.findOne({}).lean().exec();
      console.log(`user email: ${newData?.email}`);
      throw new Error('Invalid user data');
    }
  } catch (error: any) {
    console.error('Error handling setSession controller:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    res.end();
  }
};
