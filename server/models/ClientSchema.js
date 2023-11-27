"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientModel = void 0;
var mongoose_1 = require("mongoose");
var clientSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    buisnessName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId },
    defaultPin: { type: Boolean, default: true },
    nextSKU: { type: Number, default: 1 },
    nextRecipe: { type: Number, default: 1 },
    nextEmployeeID: { type: Number, default: 1 }
});
clientSchema.pre('save', function (next) {
    if (!this.userId) {
        this.userId = this._id;
    }
    next();
});
var getClientModel = function (clientInfo) {
    var uri = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
    var databaseName = clientInfo.databaseName;
    var connection = mongoose_1.default.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });
    var ClientModel = connection.model('Client', clientSchema);
    var closeConnection = function () {
        connection.close()
            .then(function () {
            console.log('Connection closed successfully.');
        })
            .catch(function (error) {
            console.error('Error closing the connection:', error);
        });
    };
    return { model: ClientModel, closeConnection: closeConnection };
};
exports.getClientModel = getClientModel;
exports.default = clientSchema;
