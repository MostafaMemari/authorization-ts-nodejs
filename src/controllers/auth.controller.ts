import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../decorators/router.decorator";

@Controller("/auth")
export class AuthController {
  @Post()
  register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, fullname } = req.body;

      return res.send({ username, password, fullname });
    } catch (error) {
      next(error);
    }
  }
}
