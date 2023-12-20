"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.Delete = exports.Put = exports.Patch = exports.Post = exports.Get = void 0;
const express_1 = require("express");
const DecoratorRouter = (0, express_1.Router)();
function Get(path) {
    return function (target, propertyKey, descriptor) {
        const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;
        DecoratorRouter.get(`${route}`, descriptor.value);
    };
}
exports.Get = Get;
function Post(path) {
    return function (target, propertyKey, descriptor) {
        const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;
        DecoratorRouter.post(`${route}`, descriptor.value);
    };
}
exports.Post = Post;
function Patch(path) {
    return function (target, propertyKey, descriptor) {
        const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;
        DecoratorRouter.patch(`${route}`, descriptor.value);
    };
}
exports.Patch = Patch;
function Put(path) {
    return function (target, propertyKey, descriptor) {
        const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;
        DecoratorRouter.put(`${route}`, descriptor.value);
    };
}
exports.Put = Put;
function Delete(path) {
    return function (target, propertyKey, descriptor) {
        const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;
        DecoratorRouter.delete(`${route}`, descriptor.value);
    };
}
exports.Delete = Delete;
function Controller(controllerPath) {
    return function (target) {
        if (controllerPath?.[0] !== "/")
            controllerPath = "/" + controllerPath;
        const path = controllerPath ? controllerPath : "/ ";
        DecoratorRouter.use(path, DecoratorRouter);
    };
}
exports.Controller = Controller;
exports.default = DecoratorRouter;
