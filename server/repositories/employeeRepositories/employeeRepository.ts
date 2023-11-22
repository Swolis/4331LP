import { Connection, Model } from "mongoose";
import employeeSchema, { IEmployee } from "../../models/employee/employeeSchema";


export const createEmployee: (clientDatabase: Connection, ProductData: any) => Promise<IEmployee> = async (clientDatabase: Connection, ProductData: any) => {
    try {
        const employeeModel: Model<IEmployee> = clientDatabase.model<IEmployee>('employees', employeeSchema);

        const newEmployee = new employeeModel(ProductData);

        // Save the new product
        await newEmployee.save();

   

        return newEmployee;
    } catch (error: any) {
        console.error('Error creating product:', error);
        throw new Error('Internal Server Error');
    }
};
