"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ProductRouter.ts
var express_1 = require("express");
var CreateProductController_1 = require("../../controllers/inventoryControllers/CreateProductController");
var ProductRouter = (0, express_1.Router)();
// routes for each function
ProductRouter.post('/CreateProduct', CreateProductController_1.createProductController);
//ProductRouter.put('/:id', editProductController);
//ProductRouter.delete('/:id', deletePoductController);
exports.default = ProductRouter;
