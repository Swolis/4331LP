import { Request, Response } from 'express'

import clientSchema, { IClient, getClientModel } from '../../models/ClientSchema';

import { createEmployee } from '../../repositories/employeeRepositories/employeeRepository';

export const createEmployeeController = async ( req: Request, res: Response): Promise<void> => {
    console.log('entering create product controller');
    try {

        const ClientModel = getClientModel(req.app.locals.client);
        // const clientDatabase: Connection = req.app.locals.client;
        // const ClientModel: Model<IClient> = clientDatabase.model<IClient>('Client', clientSchema);
        const client = await ClientModel.findOne({});

        if (!client){
            throw new Error('user not found');
        }
        const EmployeeID: number = client.nextEmployeeID++;
        await client.save();

//pads out id to 7 digits
        req.body.employeeId = EmployeeID.toString().padStart(7,'0');

        

        const employeeData = {
            name: req.body.name,
            pin: req.body.pin,
            nextEmployeeID: req.body.employeeId,
            permission:req.body.permission
        };

        console.log('employeeData:', JSON.stringify(employeeData, null, 2));

        const newEmployee = await createEmployee(req.app.locals.client, employeeData);

        res.status(201).json(newEmployee);

    } catch (error: any) {
        if(error.message === 'user not found'){
            res.status(404).json({message: 'Database error: ', error});
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message});
    }
}   