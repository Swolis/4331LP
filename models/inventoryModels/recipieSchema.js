"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipeModel = exports.productTrackerSchema = void 0;
var mongoose_1 = require("mongoose");
exports.productTrackerSchema = new mongoose_1.default.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
});
var recipeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    recipeNumber: { type: Number, required: true },
    products: [{ type: exports.productTrackerSchema, required: true }],
    description: { type: String }
});
var getRecipeModel = function (connection) {
    return connection.model('Recipe', recipeSchema);
};
exports.getRecipeModel = getRecipeModel;
exports.default = recipeSchema;
