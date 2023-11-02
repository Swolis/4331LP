import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; // Import the appropriate types
import { IUser } from '../models/ClientSchema';

const jwtSecret = process.env.JWT_SECRET||'defaultSecret';

interface RUser extends Request {
    user: IUser;
}

const requireAuth = (req: RUser, res: Response, next: NextFunction) => { // Correct the type for `res`
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const tokenString = Array.isArray(token) ? token[0] : token.toString();

    jwt.verify(tokenString, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }



        req.user = decodedToken as IUser;
        next();
    });
}

export default requireAuth; // Export the middleware function
