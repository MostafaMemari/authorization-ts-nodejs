"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const router_decorator_1 = require("../decorators/router.decorator");
const user_model_1 = require("../models/user.model");
const utils_1 = require("../modules/utils");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res, next) {
        try {
            const { username, password, fullname } = req.body;
            await this.authService.register({ username, password, fullname });
            return res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const existUser = await user_model_1.UserModel.findOne({ username });
            if (!existUser)
                throw { status: 401, message: "this username or password is incorrect" };
            const isTrueUser = (0, utils_1.compareHashString)(password, existUser.password);
            if (!isTrueUser)
                throw { status: 401, message: "this username or password is incorrect" };
            await (0, utils_1.jwtGenerator)({ username, id: existUser._id });
            const user = await user_model_1.UserModel.findById(existUser._id, { password: 0 });
            return res.json({
                statusCode: 200,
                data: {
                    user,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, router_decorator_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, router_decorator_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, router_decorator_1.Controller)("/auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
