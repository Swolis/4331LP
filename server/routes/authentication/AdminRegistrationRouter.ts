// AdminRegistrationRouter.ts
import { Router, Request, Response } from 'express';
import { AdminRegistrationController } from '../../controllers/systemAuthentication/AdminRegistrationController';

const AdminRegistrationRouter = Router();

AdminRegistrationRouter.use((req, res, next) => {
    console.log(`Admin Registration router Received ${req.method} request on ${req.url}`);
    next();
  });

export default AdminRegistrationRouter.post('/', AdminRegistrationController);
