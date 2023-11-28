"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var createOrderController_1 = require("../../../controllers/registerControllers/createOrderController");
var orderRouter = (0, express_1.Router)();
orderRouter.post('/Save-Order', createOrderController_1.createOrderController);
exports.default = orderRouter;
