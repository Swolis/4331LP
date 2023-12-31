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
exports.AdminLoginController = void 0;
var ClientSchema_1 = require("../../models/ClientSchema");
var jwt = require('jsonwebtoken');
// Controller function
var AdminLoginController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ClientModel, closeConnection_1, data_1, SecretKey_1, session, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('\n\nentering set session from controller');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                console.log('Stored client connection:', req.session.client);
                _a = (0, ClientSchema_1.getClientModel)(req.session.client), ClientModel = _a.model, closeConnection_1 = _a.closeConnection;
                // Access properties from getModel
                console.log("session stored email: ".concat(req.session.email));
                return [4 /*yield*/, ClientModel.findOne({ email: req.session.email }).exec()];
            case 2:
                data_1 = _b.sent();
                console.log('Data from the "client" collection:', data_1);
                if (data_1) {
                    SecretKey_1 = process.env.SECRET_KEY;
                    session = req.session;
                    session.client = req.session.client;
                    session.userID = data_1._id;
                    session.authenticated = true;
                    session.save(function (err) {
                        if (err) {
                            console.error('Error saving session:', err);
                            res.status(500).json({ message: 'Internal server error.' });
                        }
                        else {
                            console.log("secret key: ".concat(SecretKey_1));
                            var token = jwt.sign({ userID: data_1._id, defaultPin: data_1.defaultPin }, SecretKey_1, { expiresIn: '120m' });
                            console.log("Generated token: ".concat(token));
                            res.cookie('authToken', token, { maxAge: 30 * 60 * 1000, httpOnly: false, secure: true });
                            closeConnection_1(); // Close the connection when done
                            res.status(200).json({ message: 'Login Successful' });
                            return;
                        }
                    });
                }
                else {
                    throw new Error('Invalid user data');
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error('Error handling setSession controller:', error_1);
                res.status(500).json({ message: 'Internal server error.' });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.AdminLoginController = AdminLoginController;
