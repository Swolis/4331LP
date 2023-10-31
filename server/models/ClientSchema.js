const Product = require('./productSchema');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: Number, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    products: [Product.schema]
});
const newUser = mongoose.model('Client', userSchema);
module.exports = newUser;
export {};
