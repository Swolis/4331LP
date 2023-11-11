import { Request, Response } from 'express';
import ListClientSchema, { IListClient } from '../../models/listOfClients/ClientListSchema';
import mongoose, { Model } from 'mongoose';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SecretKey: string = 'your-secret-key';

export const AdminLoginController = async (req: Request, res: Response) => {
  console.log('In AdminLoginController');
  const { username, password } = req.body as { username: string; password: string };
  try {

    const ListClientModel: Model<IListClient> = mongoose.model<IListClient>('ListClient');

    const user = await ListClientModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication Failed.' });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (isMatch) {
      const token = jwt.sign({ username, databaseName: user.databaseName }, SecretKey, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: true });
      return res.status(200).json({ message: 'Authentication Successful.' });
    } else {
      return res.status(400).json({ message: 'Authentication Failed.' });
    }
  } catch (error) {
    console.error('Error during login.', error);
    return res.status(500).json({ message: 'Login Failed' });
  }
};

