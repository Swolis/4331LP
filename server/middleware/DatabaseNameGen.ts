// DatabaseNameGen.ts
import { Request, Response, NextFunction } from 'express';
import { ConnectToClientListMiddleWare } from './ConnectToClientListMiddleware';

export const DatabaseNameGen = (req: Request, res: Response, next: NextFunction) =>
{
    if(!(req.url === '/Admin-Registration' || req.method === 'Post')){
        next();
        return;
    }
    const s = '!#%&()+,-0123456789;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{}~';
    let result = '';

    for(let i = 0; i < 37; i++){
        const randomIndex = Math.floor(Math.random() * s.length);
        result += s.charAt(randomIndex);
    }

    console.log(`generated name: ${result}`);

    (req as any).body.databaseName = result;

    console.log(result);
    next();

}
