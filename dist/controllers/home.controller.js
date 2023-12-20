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
exports.HomeController = void 0;
const router_decorator_1 = require("../decorators/router.decorator");
let HomeController = class HomeController {
    GetHomeInfo(req, res, next) {
        try {
            return res.send("users");
        }
        catch (error) {
            next(error);
        }
    }
};
exports.HomeController = HomeController;
__decorate([
    (0, router_decorator_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "GetHomeInfo", null);
exports.HomeController = HomeController = __decorate([
    (0, router_decorator_1.Controller)("/users")
], HomeController);
