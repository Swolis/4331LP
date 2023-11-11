"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// AdminRegistrationRouter.ts
var express_1 = require("express");
var AdminRegistrationController_1 = require("../../controllers/systemAuthentication/AdminRegistrationController");
var AdminRegistrationRouter = (0, express_1.Router)();
AdminRegistrationRouter.use(function (req, res, next) {
    console.log("Admin Registration router Received ".concat(req.method, " request on ").concat(req.url));
    next();
});
exports.default = AdminRegistrationRouter.post('/', AdminRegistrationController_1.AdminRegistrationController);
