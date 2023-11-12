// expressAppRouter.ts
import { Router } from 'express';
import ProductRouter from './api/ProductRouter';
import AdminLoginRoute from './authentication/LoginRoutes';
import AdminRegistrationRouter from './authentication/AdminRegistrationRouter';

const mainRouter = Router();

// Logging middleware for all routes
mainRouter.use((req, res, next) => {
  console.log(`Main router Received ${req.method} request on ${req.url}`);
  next();
});

// Login routes
mainRouter.use('/Admin-Login', AdminLoginRoute);
mainRouter.use('/Admin-Registration', AdminRegistrationRouter);

// Mount the required router
// Product routes
mainRouter.use('/api/product', ProductRouter);

// Recipe routes
// mainRouter.use('/api/recipe', RecipeRouter);

export default mainRouter;