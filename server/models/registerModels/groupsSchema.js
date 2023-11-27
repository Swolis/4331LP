"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupModel = void 0;
// productSchema.ts
var mongoose_1 = require("mongoose");
var recipieButtonSchema_1 = require("./recipieButtonSchema");
// Define Schema
var groupSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    button: { type: [recipieButtonSchema_1.default], required: true },
    groups: { type: [String], refrence: 'subgroups', required: false }
});
var getGroupModel = function (clientInfo) {
    var uri = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
    var databaseName = clientInfo.databaseName;
    var connection = mongoose_1.default.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });
    var GroupModel = connection.model('orders', groupSchema);
    var closeConnection = function () {
        connection.close()
            .then(function () {
            console.log('Connection closed successfully.');
        })
            .catch(function (error) {
            console.error('Error closing the connection:', error);
        });
    };
    return { model: GroupModel, closeConnection: closeConnection };
};
exports.getGroupModel = getGroupModel;
exports.default = groupSchema;
