// Import necessary types and modules
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IClient, getClientModel } from '../../models/ClientSchema';
const jwt = require('jsonwebtoken');

// Define an interface for the returned object from getClientModel
interface ClientModelContainer {
  model: Model<IClient>;
  closeConnection: () => void;
}

// Controller function
export const AdminLoginController = async (req: Request, res: Response) => {
  console.log('\n\nentering set session from controller');

  try {
    console.log('Stored client connection:', (req as any).session.client);

    // Explicitly specify the type of getModel
    const getModel: ClientModelContainer = getClientModel((req as any).session.client);

    // Access properties from getModel
    const ClientModel: Model<IClient> = getModel.model;
    const closeConnection = getModel.closeConnection;

    console.log(`session stored email: ${(req as any).session.email}`);

    const data = await ClientModel.findOne({ email: (req as any).session.email }).exec();
    console.log('Data from the "client" collection:', data);

    if (data) {
      const SecretKey = process.env.SECRET_KEY;
      console.log(`secret key: ${SecretKey}`);

      const token = jwt.sign({ userID: data._id }, SecretKey, { expiresIn: '120m' });
      console.log(`Generated token: ${token}`);

      res.cookie('authToken', token, { maxAge: 30 * 60 * 1000, httpOnly: false, secure: true });

      (req as any).session.authenticated = true;

      closeConnection(); // Close the connection when done
      res.status(200).json({ message: 'Login Successful' });
      return;
    } else {
      throw new Error('Invalid user data');
    }
  } catch (error: any) {
    console.error('Error handling setSession controller:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    res.end();
  }
};
