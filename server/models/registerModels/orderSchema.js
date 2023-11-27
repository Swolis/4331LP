"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderModel = void 0;
var itemSchema_1 = require("./itemSchema");
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    employeeID: { type: String, required: true },
    orderID: { type: Number, required: true },
    date: { type: String, required: true },
    listOfItems: { type: [itemSchema_1.default], required: true },
    totalPrice: { type: Number, required: true }
});
var getOrderModel = function (clientInfo) {
    var uri = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
    var databaseName = clientInfo.databaseName;
    var connection = mongoose_1.default.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });
    var OrderModel = connection.model('orders', orderSchema);
    var closeConnection = function () {
        connection.close()
            .then(function () {
            console.log('Connection closed successfully.');
        })
            .catch(function (error) {
            console.error('Error closing the connection:', error);
        });
    };
    return { model: OrderModel, closeConnection: closeConnection };
};
exports.getOrderModel = getOrderModel;
exports.default = orderSchema;
