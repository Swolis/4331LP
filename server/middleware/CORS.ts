// corsConfig.ts
import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {

    origin: ['http://businesscraft.work', 'https://businesscraft.work'],
    methods: ['GET', 'HEAD', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

