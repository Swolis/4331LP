"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productSchema.ts
var mongoose_1 = require("mongoose");
// Define Schema
var productButtonSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    productID: { type: String, ref: 'product', required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});
exports.default = productButtonSchema;
