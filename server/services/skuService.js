"use strict";
// skuService.js
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
var console_1 = require("console");
var databaseConnection_1 = require("../config/databaseConnection");
// connect to mongo server
function getSkuCollection(client) {
    return __awaiter(this, void 0, void 0, function () {
        var db, collectionName, skuCollection, documentCount, error_1, skuCollection, skuDocument;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = client.db();
                    collectionName = 'sku_counter';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 7]);
                    console.log('\nin try\n');
                    skuCollection = db.collection(collectionName);
                    return [4 /*yield*/, skuCollection.countDocuments()];
                case 2:
                    documentCount = _a.sent();
                    if (documentCount < 1)
                        throw new Error('newCollection');
                    return [2 /*return*/, skuCollection];
                case 3:
                    error_1 = _a.sent();
                    if (!(error_1.message === 'newCollection')) return [3 /*break*/, 5];
                    // the collection does not exist --> create it
                    console.error("Collection ".concat(collectionName, " did not exist"));
                    return [4 /*yield*/, db.createCollection('sku_counter')];
                case 4:
                    skuCollection = _a.sent();
                    skuDocument = {
                        value: 0,
                    };
                    skuCollection.insertOne(skuDocument);
                    return [2 /*return*/, skuCollection];
                case 5:
                    console.log('\nother error\n');
                    console.error('Other database error: ', error_1);
                    throw error_1;
                case 6: return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function getNewSKU(client) {
    return __awaiter(this, void 0, void 0, function () {
        var db, skuCollection, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = client.db();
                    return [4 /*yield*/, getSkuCollection(client)];
                case 1:
                    skuCollection = _a.sent();
                    return [4 /*yield*/, (skuCollection === null || skuCollection === void 0 ? void 0 : skuCollection.findOneAndUpdate({}, // Filter, find any document in the collection
                        { $inc: { value: 1 } }, // Increment the valuefield by 1
                        { returnDocument: "before"
                        }))];
                case 2:
                    result = _a.sent();
                    console.log('result: ', result);
                    try {
                        if (result && typeof result.value === 'number') {
                            return [2 /*return*/, result.value];
                        }
                        else {
                            throw console_1.error;
                        }
                    }
                    catch (error) {
                        console.log('error: ', error);
                        throw error;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, newSku;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, databaseConnection_1.connectToDatabase)()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, getNewSKU(client)];
                case 2:
                    newSku = _a.sent();
                    console.log('newSku: ', newSku);
                    return [4 /*yield*/, client.close()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
