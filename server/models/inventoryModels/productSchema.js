"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductModel = void 0;
// productSchema.ts
var mongoose_1 = require("mongoose");
var inventorySchema_1 = require("./inventorySchema");
var productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: Number, required: true },
    description: { type: String, required: false },
    inventoryConfig: { type: inventorySchema_1.default, required: true },
    inventory: { type: Object, required: true },
});
var getProductModel = function (clientInfo) {
    var uri = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
    var databaseName = clientInfo.databaseName;
    var connection = mongoose_1.default.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });
    var ProductModel = connection.model('products', productSchema);
    var closeConnection = function () {
        connection.close()
            .then(function () {
            console.log('Connection closed successfully.');
        })
            .catch(function (error) {
            console.error('Error closing the connection:', error);
        });
    };
    return { model: ProductModel, closeConnection: closeConnection };
};
exports.getProductModel = getProductModel;
exports.default = productSchema;
