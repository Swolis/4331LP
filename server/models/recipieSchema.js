"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productSchema.ts
var mongodb_1 = require("mongodb");
var mongoose_1 = require("mongoose");
//const mongoose = require('mongoose');
// Define Schema
var recipieSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: Number, required: true },
    products: { type: [mongodb_1.ObjectId], required: true },
    description: { type: String, required: false }
});
exports.default = recipieSchema;
