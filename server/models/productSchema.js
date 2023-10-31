"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productSchema.ts
var mongoose_1 = require("mongoose");
//const mongoose = require('mongoose');
// Define Schema
var productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: Number, required: true },
    description: { type: String, required: false }
});
var Product = mongoose_1.default.model('ProductCollection', productSchema);
exports.default = Product;
