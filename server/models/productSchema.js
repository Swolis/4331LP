"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
// Define Schema
var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: Number, required: true },
    description: { type: String, required: false }
});
var Product = mongoose.model('Product', productSchema);
module.exports = Product;
