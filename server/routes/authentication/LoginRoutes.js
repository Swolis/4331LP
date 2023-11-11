"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// LoginRoutes.ts
var express_1 = require("express");
var AdminLoginController_1 = require("../../controllers/systemAuthentication/AdminLoginController");
var AdminLoginRoute = (0, express_1.Router)();
AdminLoginRoute.post('/', AdminLoginController_1.AdminLoginController);
exports.default = AdminLoginRoute;
