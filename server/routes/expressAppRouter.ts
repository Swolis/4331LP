// expressAppRouter.ts
import { Router } from 'express';
import ProductRouter from './api/ProductRouter';
import AdminLoginRoute from './authentication/LoginRoutes';
import AdminRegistrationRouter from './authentication/AdminRegistrationRouter';
import RecipeRouter from './api/RecipeRouter';

import EmployeeRouter from './api/EmployeeRouter';
import orderRouter from './api/orderRoutes/orderRouter';
import groupRouter from './api/registerRoutes/groupRouter'

const mainRouter = Router();

// Logging middleware for all routes
mainRouter.use((req, res, next) => {
  console.log(`Main router Received ${req.method} request on ${req.url}`);
  next();
});

// Login routes
mainRouter.use('/Admin-Login', AdminLoginRoute);
mainRouter.use('/Admin-Registration', AdminRegistrationRouter);

mainRouter.use('/Employee-Route/', EmployeeRouter);

// Mount the required router
// Product routes
mainRouter.use('/Product/', ProductRouter);

// Recipe routes
mainRouter.use('/Recipe-Router/', RecipeRouter);


// order router
mainRouter.use('/Order-Router/', orderRouter);

// managing buttons of POS
mainRouter.use('/Button-Routes/', groupRouter);

export default mainRouter;