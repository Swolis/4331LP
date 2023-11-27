import { Connection, Model } from "mongoose";
import employeeSchema, { IEmployee, getEmployeeModel } from "../../models/employee/employeeSchema";


export const createEmployee: (clientDatabase: Connection, ProductData: any) => Promise<IEmployee> = async (clientDatabase: Connection, ProductData: any) => {
    try {
        const { model: EmployeeModel, closeConnection } = getEmployeeModel(clientDatabase);

        const newEmployee = new EmployeeModel(ProductData);

        // Save the new product
        await newEmployee.save();

        closeConnection();

        return newEmployee;

    } catch (error: any) {
        console.error('Error creating product:', error);
        throw new Error('Internal Server Error');
    }
};
