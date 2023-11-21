"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productSchema.ts
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: Number, required: true },
    description: { type: String, required: false },
});
exports.default = productSchema;
