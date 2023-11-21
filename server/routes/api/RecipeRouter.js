"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RecipeRouter.ts
var express_1 = require("express");
var CreateRecipeController_1 = require("../../controllers/inventoryControllers/CreateRecipeController");
var RecipeRouter = (0, express_1.Router)();
RecipeRouter.post('/Create-Recipe', CreateRecipeController_1.createRecipeController);
exports.default = RecipeRouter;
