const express = require ('express');
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

//import dotenv = require('dotenv');

// get config vars
//dotenv.config();

// access config var

console.log('above function extracor');

const jwtSecret: string = 'SecretKey'; // needs to be changed to environment variable in future

export function tokenExtractor(req: Request, res: Response, next: NextFunction) {
    console.log('Entering tokenExtractor middleware'); // Add this line
    if(!(req.url === '/Admin-Login' && req.method === 'POST')){
        console.log('tockenExtractor not applicable');
        return next();
    }

    console.log('req.headers.authorization from token extractor : ', req.headers.authorization);

    const token = req.headers.authorization;

    let tokenToDecode: any = '';
    if(token && token.startsWith('Bearer ')){
        tokenToDecode = token.slice(7);
    }else{
        tokenToDecode = token;
    }

    console.log('token to decode: ', tokenToDecode);

    if(tokenToDecode) {

        try {
            const decoded = jwt.verify(tokenToDecode, jwtSecret);
            if (typeof decoded === 'object' && 'databaseName' in decoded) {
                console.log('databasename: ', decoded.databaseName);
                req.app.locals.databaseName = decoded.databaseName;
            } else {
                throw new Error('Invalid token');
            }
            next();
            //return res.status(200).json({message: 'OK'});
        }catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    // database name is used to login to a specific database on within teh atlas account
    next();
}

// test case code
// // Create a valid JWT token with a known value
// const validToken = sign({ databaseName: 'YourDatabaseName' }, 'SecretKey', {
//     expiresIn: 4 * 60 * 60, // 4 hours in seconds
//   });
// console.log('validToken: ', validToken);



// const mockRequest: Request = {
//     headers: {
//         authorization: `Bearer ${validToken}`, // Include the token in the authorization header
//     },
// } as Request;
// console.log('Authorization Header: ', mockRequest.headers.authorization);
// const mockResponse: Response = {
//     status: (code: number) => {
//         return {
//             json: (data: any) => {
//                 console.log(`Response Status Code: ${code}`);
//                 console.log('Response Data:', data);
//             },
//         };
//     },
// } as Response;

// console.log('verify known valid: ', jwt.verify(validToken, jwtSecret));
// //const decoded = jwt.verify(validToken, jwtSecret);

// //console.log('Decoded Payload: ', decoded);

// const mockNext: NextFunction = () => {
//     console.log('Next function called.');
// };

// tokenExtractor(mockRequest, mockResponse, mockNext);