"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeController = void 0;
var ClientSchema_1 = require("../../models/ClientSchema");
var employeeRepository_1 = require("../../repositories/employeeRepositories/employeeRepository");
var createEmployeeController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ClientModel, client, EmployeeID, employeeData, newEmployee, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('entering create product controller');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                ClientModel = (0, ClientSchema_1.getClientModel)(req.session.client);
                return [4 /*yield*/, ClientModel.findOne({})];
            case 2:
                client = _a.sent();
                if (!client) {
                    throw new Error('user not found');
                }
                EmployeeID = client.nextEmployeeID++;
                if (req.body.defaultPin) {
                    client.defaultPin = false;
                }
                return [4 /*yield*/, client.save()];
            case 3:
                _a.sent();
                //pads out id to 7 digits
                req.body.employeeId = EmployeeID.toString().padStart(7, '0');
                employeeData = {
                    name: req.body.name,
                    pin: req.body.pin,
                    nextEmployeeID: req.body.employeeId,
                    permission: req.body.permission
                };
                console.log('employeeData:', JSON.stringify(employeeData, null, 2));
                return [4 /*yield*/, (0, employeeRepository_1.createEmployee)(req.app.locals.client, employeeData)];
            case 4:
                newEmployee = _a.sent();
                res.status(201).json(newEmployee);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                if (error_1.message === 'user not found') {
                    res.status(404).json({ message: 'Database error: ', error: error_1 });
                }
                res.status(500).json({ message: 'Internal Server Error', error: error_1.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createEmployeeController = createEmployeeController;
