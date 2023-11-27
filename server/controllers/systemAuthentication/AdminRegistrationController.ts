// AdminRegistrationController.ts

import { Request, Response } from 'express';
import{Connection}from 'mongoose'

import { createClient } from '../../repositories/clientRepository';
// client repo 
// client database repo

const express = require('express');
//const bcrypt = require('bcrypt');

export const AdminRegistrationController = async (req: Request, res: Response) =>
{
    const clientDatabase: Connection = req.app.locals.client;
    console.log('entering AdminRegistrationcontorller')
    const userData = {
        buisnessName: req.body.businessName,
        email: req.body.businessEmail,
        phone: req.body.businessPhone,
        address: req.body.address,
        username: req.body.username,

    }

    console.log('userdata: ',userData);

    console.log(`data: ${req.body.buisnessName, req.body.email,
        req.body.phone,
        req.body.address,
        req.body.username}`)

    try{
        
        await createClient(userData, clientDatabase);
        console.log('done with repo');
        return res.status(200).json({ message: 'OK' });
        

    }catch(error: any){
        return res.status(500).json({ messsage: 'Internal Server Error.' });
    }
}