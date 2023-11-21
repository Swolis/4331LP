"use strict";
// productSchema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeModel = void 0;
var mongoose_1 = require("mongoose");
//const mongoose = require('mongoose');
// Define Schema
var recipieSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    recipieid: { type: Number, required: true },
    products: { type: [String], required: true },
    description: { type: String }
});
var createRecipeModel = function (connection) {
    return connection.model('Recipe', recipieSchema);
};
exports.createRecipeModel = createRecipeModel;
exports.default = recipieSchema;
