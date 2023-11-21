"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productSchema.ts
var mongoose_1 = require("mongoose");
// Define Schema
var buttonSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    recipie: { type: mongoose_1.Types.ObjectId, ref: 'recipie', required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});
exports.default = buttonSchema;
