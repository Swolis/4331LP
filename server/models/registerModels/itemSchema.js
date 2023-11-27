"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productSchema.ts
var mongoose_1 = require("mongoose");
// Define Schema
var itemSchema = new mongoose_1.default.Schema({
    recipieID: { type: String, ref: 'recipie', required: true },
    mod: { type: [String], ref: 'products', required: false }
});
exports.default = itemSchema;
