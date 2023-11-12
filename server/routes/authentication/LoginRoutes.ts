// LoginRoutes.ts
import { Router, Request, Response } from 'express';
import { AdminLoginController } from '../../controllers/systemAuthentication/AdminLoginController';

const AdminLoginRoute = Router();

AdminLoginRoute.post('/', AdminLoginController);

export default AdminLoginRoute;