"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productSchema_1 = require("./productSchema");
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: Number, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId },
    products: [productSchema_1.default.schema]
});
userSchema.pre('save', function (next) {
    if (!this.userId) {
        this.userId = this._id;
    }
    next();
});
var User = mongoose_1.default.model('Client', userSchema);
exports.default = User;
