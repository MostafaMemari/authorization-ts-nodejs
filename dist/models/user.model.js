"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    accessToken: { type: String },
    email: { type: String },
    mobile: { type: String },
}, {
    versionKey: false,
});
exports.UserModel = (0, mongoose_1.model)("user", UserSchema);
