// DatabaseNameGen.ts
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const DatabaseNameGen = (req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/Admin-Registration' || req.method === 'POST') {
        const uniqueId = uuidv4();
        (req as any).body.databaseName = uniqueId;
    }

    next();
};
