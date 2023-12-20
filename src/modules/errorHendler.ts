import { Application, NextFunction, Request, Response } from "express";
import { ResponseMethod } from "../types/public.types";

export function notFoundHander(app: Application) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const response: ResponseMethod = {
      statusCode: 404,
      message: "Not Found Page",
    };
    return res.status(404).json(response);
  });
}
export function AllExceptionHandler(app: Application) {
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = +error?.status || 500;
    const message: string = error?.message || "InternalServerError";

    const response: ResponseMethod = {
      statusCode,
      message,
      errors: error?.errors || [],
    };
    return res.status(statusCode).json(response);
  });
}
