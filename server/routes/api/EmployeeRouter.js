"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateEmployeeController_1 = require("../../controllers/employeeControllers/CreateEmployeeController");
var EmployeeRouter = (0, express_1.Router)();
EmployeeRouter.post('/Create-Employee', CreateEmployeeController_1.createEmployeeController);
exports.default = EmployeeRouter;
