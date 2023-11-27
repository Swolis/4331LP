"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RecipeRouter.ts
var express_1 = require("express");
var CreateRecipeController_1 = require("../../controllers/inventoryControllers/CreateRecipeController");
var RecipeSearchController_1 = require("../../controllers/inventoryControllers/RecipeSearchController");
var RecipeRouter = (0, express_1.Router)();
RecipeRouter.post('/Create-Recipe', CreateRecipeController_1.createRecipeController);
RecipeRouter.post('/Search-Recipe', RecipeSearchController_1.RecipeSearchController);
exports.default = RecipeRouter;
