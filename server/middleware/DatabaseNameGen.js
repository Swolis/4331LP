"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseNameGen = void 0;
var mongodb_1 = require("mongodb");
var DatabaseNameGen = function (req, res, next) {
    if (req.url === '/Admin-Registration' || req.method === 'POST') {
        var uniqueId = new mongodb_1.ObjectId();
        req.body.databaseName = uniqueId.toHexString();
    }
    next();
};
exports.DatabaseNameGen = DatabaseNameGen;
