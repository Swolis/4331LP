import { Router } from 'express';
import { createEmployeeController } from '../../controllers/employeeControllers/CreateEmployeeController';

const EmployeeRouter = Router();

EmployeeRouter.post('/Create-Employee', createEmployeeController);

export default EmployeeRouter;