"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductModel = void 0;
// productSchema.ts
var mongoose_1 = require("mongoose");
var inventorySchema_1 = require("./inventorySchema");
// Define Schema
var productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: Number, required: true },
    description: { type: String, required: false },
    inventoryConfig: { type: inventorySchema_1.default, required: true },
    inventory: { type: Object, required: true },
});
var getProductModel = function (connection) {
    return connection.model('products', productSchema);
};
exports.getProductModel = getProductModel;
exports.default = productSchema;
