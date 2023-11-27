// corsConfig.ts
import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {

    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

