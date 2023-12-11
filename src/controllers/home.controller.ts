import { NextFunction, Request, Response } from "express";

@Controller("/")
export class HomeApplication {
  GetHomeInfo(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
