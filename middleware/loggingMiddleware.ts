// loggingMiddleware.js
import {Request, Response, NextFunction } from 'express';
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
  };
    