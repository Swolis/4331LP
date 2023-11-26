import { Request, Response, NextFunction } from 'express';
import { Connection, Model } from 'mongoose';
import clientSchema, { IClient, getClientModel } from '../../models/ClientSchema';
const jwt = require('jsonwebtoken');

const convertToPlainObject = (doc: any) => {
    return doc?.toObject({ getters: true, virtuals: true });
  };
  
  export const AdminLoginController = async (req: Request, res: Response) => {
    console.log('\n\nentering set session from controller');
  
    try {
      const ClientModel: Model<IClient> = getClientModel((req as any).session.client);
      console.log(`session stored email: ${(req as any).session.email}`);
  
      const data = await ClientModel.findOne({ email: (req as any).session.email }).lean().exec();
  
      // Convert the document to a plain JavaScript object to handle circular references
      const plainData = convertToPlainObject(data);
  
      console.log('Data from the "client" collection:', plainData);
  
      if (plainData) {
      const SecretKey = process.env.SECRET_KEY;
      console.log(`secret key: ${SecretKey}`);

      const token = jwt.sign({ userID: plainData._id }, SecretKey, { expiresIn: '120m' });
      console.log(`Generated token: ${token}`);

      res.cookie('authToken', token, { maxAge: 30 * 60 * 1000, httpOnly: false, secure: true });

      (req as any).session.authenticated = true;

      res.status(200).json({ message: 'Login Successful' });
      return;
    } else {
      const newData = await ClientModel.findOne({}).exec();

      // Convert the document to a plain JavaScript object to handle circular references
      const plainNewData = convertToPlainObject(newData);

      console.log(`user email: ${plainNewData?.email}`);
      throw new Error('Invalid user data');
    }
  } catch (error: any) {
    console.error('Error handling setSession controller:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    res.end();
  }
};
