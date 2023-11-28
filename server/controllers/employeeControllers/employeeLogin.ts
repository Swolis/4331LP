import { Request, Response } from 'express';
import { getEmployeeModel } from '../../models/employee/employeeSchema';

export const EmployeeLoginController = async (req: Request, res: Response): Promise<void> => {
    // use employeeModel
    const { model: EmployeeModel, closeConnection } = getEmployeeModel((req as any).session.client);

    const query: string = req.body.query;
    console.log(`query: ${query}`);

    try {
        let searchResult;

        searchResult = await EmployeeModel.findOne({
            pin: query
        });

        if (searchResult === null) {
            console.log('No employee found');
            res.status(404).json({ message: 'Employee not found' });
            return;
        }

        res.status(201).json(searchResult);
    } catch (error: any) {
        console.log('Error: ', error);
        res.status(500).json({ message: `Internal server error: ${error}` });
    } finally {
        closeConnection();
    }
};
