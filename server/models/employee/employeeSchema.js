"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// productSchema.ts
var mongoose_1 = require("mongoose");
var employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    pin: { type: String, required: true }
});
exports.default = employeeSchema;
