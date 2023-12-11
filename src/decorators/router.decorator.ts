import { Router } from "express";

const router: Router = Router();

export function Controller(controllerPath?: string | undefined) {
  return function (target: any) {
    console.log(target);
    const path = controllerPath? controllerPath : 
  };
}
