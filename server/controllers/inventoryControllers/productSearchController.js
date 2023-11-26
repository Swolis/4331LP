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
exports.findProductController = void 0;
var productSchema_1 = require("../../models/inventoryModels/productSchema");
var findProductController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ProductModel, closeConnection, query, searchResult, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('entering product search controller');
                _a = (0, productSchema_1.getProductModel)(req.session.client), ProductModel = _a.model, closeConnection = _a.closeConnection;
                query = req.body.query;
                console.log("query: ".concat(query));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                searchResult = void 0;
                if (!(typeof (query) === 'string')) return [3 /*break*/, 3];
                console.log('query is a string');
                return [4 /*yield*/, ProductModel.find({
                        $or: [
                            { name: { $regex: query, $options: 'i' } },
                        ],
                    })];
            case 2:
                searchResult = _b.sent();
                return [3 /*break*/, 9];
            case 3:
                if (!(typeof (query) === 'number')) return [3 /*break*/, 8];
                if (!(query === 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, ProductModel.find({})];
            case 4:
                searchResult = _b.sent();
                return [3 /*break*/, 7];
            case 5:
                console.log('query is a number');
                return [4 /*yield*/, ProductModel.find({
                        $or: [
                            { price: query },
                            { sku: query },
                        ],
                    })];
            case 6:
                searchResult = _b.sent();
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8: throw new Error('search type invalid');
            case 9:
                closeConnection();
                if (searchResult.length === 0) {
                    console.log('no product found');
                    res.status(404).json({ message: 'product no found' });
                    return [2 /*return*/];
                }
                res.status(201).json(searchResult);
                return [2 /*return*/];
            case 10:
                error_1 = _b.sent();
                console.log('error: ', error_1);
                res.status(500).json({ message: "Internal server error: ".concat(error_1) });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.findProductController = findProductController;
