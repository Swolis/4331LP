"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubGroupModel = void 0;
var productButtonSchema_1 = require("./productButtonSchema");
var mongoose_1 = require("mongoose");
var subGroupSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    name: { type: String, required: true },
    button: { type: [productButtonSchema_1.default], required: true },
});
var getSubGroupModel = function (clientInfo) {
    var uri = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
    var databaseName = clientInfo.databaseName;
    var connection = mongoose_1.default.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });
    var SubGroupModel = connection.model('subgroup', subGroupSchema);
    var closeConnection = function () {
        connection.close()
            .then(function () {
            console.log('Connection closed successfully.');
        })
            .catch(function (error) {
            console.error('Error closing the connection:', error);
        });
    };
    return { model: SubGroupModel, closeConnection: closeConnection };
};
exports.getSubGroupModel = getSubGroupModel;
exports.default = subGroupSchema;
