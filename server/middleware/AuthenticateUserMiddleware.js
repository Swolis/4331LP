"use strict";
// AuthenicateUserMiddleware.ts
/*Used to check datbase to authenticate user*/
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
exports.AuthenicateUserMiddleware = void 0;
var ClientListSchema_1 = require("../models/listOfClients/ClientListSchema");
var mongoose_1 = require("mongoose");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var AuthenicateUserMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var EnteredUsername, EnteredPassword, ListClientModel, user, collectionName, isMatch, SecretKey, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Entering Authentication middleware');
                console.log("method: ".concat(req.method));
                console.log("url: ".concat(req.url));
                if (!(req.url === '/Admin-Login' && req.method === 'POST')) {
                    console.log('Authentication Middleware not applicable');
                    next();
                    return [2 /*return*/];
                }
                console.log('Authentication is applicable');
                console.log('req.body: ', req.body);
                return [4 /*yield*/, req.body.username];
            case 1:
                EnteredUsername = _a.sent();
                return [4 /*yield*/, req.body.password];
            case 2:
                EnteredPassword = _a.sent();
                console.log("u: ".concat(EnteredUsername, " p: ").concat(EnteredPassword));
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                ListClientModel = mongoose_1.default.model('ClientList', ClientListSchema_1.default);
                return [4 /*yield*/, ListClientModel.findOne({ username: EnteredUsername })];
            case 4:
                user = _a.sent();
                collectionName = ListClientModel.collection.name;
                console.log('collection name: ', collectionName);
                console.log(user);
                if (!user) {
                    console.log('user not found: ', user);
                    return [2 /*return*/, res.status(401).json({ messahe: 'Username not found' })];
                }
                else {
                    console.log('is user');
                }
                isMatch = (EnteredPassword === user.hashedPassword);
                if (isMatch) {
                    console.log('passwords match');
                    SecretKey = 'SecretKey';
                    token = jwt.sign({ databaseName: user.databaseName }, SecretKey);
                    req.headers.authorization = token;
                    console.log('from authorization: req.headers.authorization: ', req.headers.authorization);
                    next();
                }
                else {
                    console.log('passwords dont match');
                    return [2 /*return*/, res.status(401).json({ message: 'Access Denied' })];
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Internal sever error.' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.AuthenicateUserMiddleware = AuthenicateUserMiddleware;
