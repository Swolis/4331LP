"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
var loggingMiddleware = function (req, res, next) {
    console.log("[".concat(new Date().toLocaleString(), "] ").concat(req.method, " ").concat(req.url));
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
};
exports.loggingMiddleware = loggingMiddleware;
