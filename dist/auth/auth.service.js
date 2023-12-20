"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
const utils_1 = require("../modules/utils");
class AuthService {
    async register(userDto) {
        const { username, password } = userDto;
        const newPassword = (0, utils_1.HashString)(password);
        const existUser = await user_model_1.UserModel.findOne({ username });
        if (existUser)
            throw { status: 400, message: "this username already exist" };
        userDto.
        ;
        const user = await user_model_1.UserModel.create({
            username,
            password: newPassword,
            fullname,
        });
    }
}
exports.AuthService = AuthService;
