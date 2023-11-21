"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// determines the relationship between units
var inventoryConfigSchema = new mongoose_1.default.Schema({
    case: { type: Number, default: 1 },
    innerPack: { type: Number, required: true },
    each: { type: Number, required: true },
});
exports.default = inventoryConfigSchema;
