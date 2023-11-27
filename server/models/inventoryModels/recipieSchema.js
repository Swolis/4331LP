"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipeModel = exports.productTrackerSchema = void 0;
var mongoose_1 = require("mongoose");
exports.productTrackerSchema = new mongoose_1.default.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
});
var recipeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    recipeNumber: { type: Number, required: true },
    products: [{ type: exports.productTrackerSchema, required: true }],
    description: { type: String }
});
var getRecipeModel = function (clientInfo) {
    var uri = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
    var databaseName = clientInfo.databaseName;
    var connection = mongoose_1.default.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });
    var RecipeModel = connection.model('Recipe', recipeSchema);
    var closeConnection = function () {
        connection.close()
            .then(function () {
            console.log('Connection closed successfully.');
        })
            .catch(function (error) {
            console.error('Error closing the connection:', error);
        });
    };
    return { model: RecipeModel, closeConnection: closeConnection };
};
exports.getRecipeModel = getRecipeModel;
exports.default = recipeSchema;
