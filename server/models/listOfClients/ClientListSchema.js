"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ListClientSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    databaseName: { type: String, unique: true, required: true },
}, {
    collection: 'ClientList' // Add this line to specify the collection name
});
exports.default = ListClientSchema;
