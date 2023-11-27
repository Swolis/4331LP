import { Request, Response } from 'express'
import { getClientModel } from '../../models/ClientSchema';
import { createEmployee } from '../../repositories/employeeRepositories/employeeRepository';

export const createEmployeeController = async ( req: Request, res: Response): Promise<void> => {
    console.log('entering create employee controller');
    try {

        console.log('req.body: ', req.body);

        const ClientModel = getClientModel((req as any).session.client);

        const client = await ClientModel.findOne({});

        if (!client){
            console.log('client not found');
            throw new Error('user not found');
        }
        const EmployeeID: number = client.nextEmployeeID++;

        if(req.body.defaultPin){
            client.defaultPin = false;
        }

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