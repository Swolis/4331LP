// AdminRegistrationController.ts

import { Request, Response } from 'express';


import { createClient } from '../../repositories/clientRepository';
// client repo 
// client database repo

const express = require('express');
//const bcrypt = require('bcrypt');

export const AdminRegistrationController = async (req: Request, res: Response) =>
{
    console.log('entering AdminRegistration')
    const userData = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
    }

    try{
        
        await createClient(userData, req.body.databaseName);
        console.log('done with repo');
        return res.status(200).json({ message: 'OK' });
        

    }catch(error: any){
        return res.status(500).json({ messsage: 'Internal Server Error.' });
    }
}