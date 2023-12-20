"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerator = exports.compareHashString = exports.HashString = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = require("../models/user.model");
const AccessTokenSecretKey = "BE2378478573736B435CE746585A250E";
function HashString(data) {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    const hashedString = (0, bcrypt_1.hashSync)(data, salt);
    return hashedString;
}
exports.HashString = HashString;
function compareHashString(data, encrypted) {
    return (0, bcrypt_1.compareSync)(data, encrypted);
}
exports.compareHashString = compareHashString;
async function jwtGenerator(payload) {
    const { id } = payload;
    const user = await user_model_1.UserModel.findById(id);
    if (!user)
        throw { status: 404, message: "not found user" };
    const expiresIn = new Date().getTime() + 1000 * 60 * 60 * 24;
    const algorithm = "HS512";
    (0, jsonwebtoken_1.sign)(payload, AccessTokenSecretKey, { expiresIn, algorithm }, async (error, token) => {
        if (!error && token) {
            user.accessToken = token;
            await user.save();
        }
    });
}
exports.jwtGenerator = jwtGenerator;
