"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Mongoose } from "mongoose";
const mongoose_1 = __importDefault(require("mongoose"));
// import mongoose = require('mongoose');
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});
userSchema.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString('hex');
    this.hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
userSchema.methods.validPassword = function (password) {
    var hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
exports.model = mongoose_1.default.model('chatUser', userSchema);
//   export const cleanCollection = () => model.remove({}).exec();
// export default model;
