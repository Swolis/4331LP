"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseNameGen = void 0;
var uuid_1 = require("uuid");
var DatabaseNameGen = function (req, res, next) {
    if (req.url === '/Admin-Registration' && req.method === 'POST') {
        var uniqueId = (0, uuid_1.v4)();
        req.body.databaseName = uniqueId;
    }
    next();
};
exports.DatabaseNameGen = DatabaseNameGen;
