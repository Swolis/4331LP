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
var getClientModel = function (connection) {
    return connection.model('Client', clientSchema);
};
exports.getClientModel = getClientModel;
// const User: Model<IUser> = mongoose.model<IUser>('Client', userSchema);
exports.default = clientSchema;
