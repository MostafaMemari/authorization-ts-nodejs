"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.Get = void 0;
const express_1 = require("express");
const DecoratorRouter = (0, express_1.Router)();
function Get(path) {
    return function (target, propertyKey, descriptor) {
        DecoratorRouter.get("/", descriptor.value);
    };
}
exports.Get = Get;
function Controller(controllerPath) {
    return function (target) {
        if ((controllerPath === null || controllerPath === void 0 ? void 0 : controllerPath[0]) !== "/")
            controllerPath = "/" + controllerPath;
        const path = controllerPath ? controllerPath : "/ ";
        DecoratorRouter.use(path, DecoratorRouter);
    };
}
exports.Controller = Controller;
exports.default = DecoratorRouter;
