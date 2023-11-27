"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeModel = void 0;
// productSchema.ts
var mongoose_1 = require("mongoose");
var employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    pin: { type: String, required: true },
    employeeId: { type: String, reaquired: true },
    permission: { type: Boolean, required: true }
});
var getEmployeeModel = function (clientInfo) {
    var uri = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
    var databaseName = clientInfo.databaseName;
    var connection = mongoose_1.default.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });
    var EmployeeModel = connection.model('Employee', employeeSchema);
    var closeConnection = function () {
        connection.close()
            .then(function () {
            console.log('Connection closed successfully.');
        })
            .catch(function (error) {
            console.error('Error closing the connection:', error);
        });
    };
    return { model: EmployeeModel, closeConnection: closeConnection };
};
exports.getEmployeeModel = getEmployeeModel;
exports.default = employeeSchema;
