import { Router } from "express";

const DecoratorRouter: Router = Router();

export function Get(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;

    DecoratorRouter.get(`${route}`, descriptor.value);
  };
}
export function Post(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;

    DecoratorRouter.post(`${route}`, descriptor.value);
  };
}
export function Patch(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;

    DecoratorRouter.patch(`${route}`, descriptor.value);
  };
}
export function Put(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;

    DecoratorRouter.put(`${route}`, descriptor.value);
  };
}
export function Delete(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const route = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey;

    DecoratorRouter.delete(`${route}`, descriptor.value);
  };
}

export function Controller(controllerPath?: string | undefined) {
  return function (target: any) {
    if (controllerPath?.[0] !== "/") controllerPath = "/" + controllerPath;

    const path = controllerPath ? controllerPath : "/ ";
    DecoratorRouter.use(path, DecoratorRouter);
  };
}

export default DecoratorRouter;
