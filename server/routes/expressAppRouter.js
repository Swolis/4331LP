"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// expressAppRouter.ts
var express_1 = require("express");
var ProductRouter_1 = require("./api/ProductRouter");
var LoginRoutes_1 = require("./authentication/LoginRoutes");
var AdminRegistrationRouter_1 = require("./authentication/AdminRegistrationRouter");
var RecipeRouter_1 = require("./api/RecipeRouter");
var EmployeeRouter_1 = require("./api/EmployeeRouter");
var orderRouter_1 = require("./api/orderRoutes/orderRouter");
var groupRouter_1 = require("./api/registerRoutes/groupRouter");
var mainRouter = (0, express_1.Router)();
// Logging middleware for all routes
mainRouter.use(function (req, res, next) {
    console.log("Main router Received ".concat(req.method, " request on ").concat(req.url));
    next();
});
// Login routes
mainRouter.use('/Admin-Login', LoginRoutes_1.default);
mainRouter.use('/Admin-Registration', AdminRegistrationRouter_1.default);
mainRouter.use('/Employee-Route/', EmployeeRouter_1.default);
// Mount the required router
// Product routes
mainRouter.use('/Product/', ProductRouter_1.default);
// Recipe routes
mainRouter.use('/Recipe-Router/', RecipeRouter_1.default);
// order router
mainRouter.use('/Order-Router/', orderRouter_1.default);
// managing buttons of POS
mainRouter.use('/Button-Routes/', groupRouter_1.default);
exports.default = mainRouter;
