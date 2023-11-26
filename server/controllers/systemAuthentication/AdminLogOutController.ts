// Import necessary types and modules
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IClient, getClientModel } from '../../models/ClientSchema';
const jwt = require('jsonwebtoken');

// Controller function
export const AdminLogOutController = async (req: Request, res: Response) => {
  if ((req as any).session) {
    (req as any).session.destroy((error: any) => {
      if (error) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
};
