import { Router, Request, Response } from 'express';
import { AdminLogOutController } from '../../controllers/systemAuthentication/AdminLogOutController';
const AdminLogOutRoute = Router();

AdminLogOutRoute.delete('/webclient', AdminLogOutController);

export default AdminLogOutRoute;