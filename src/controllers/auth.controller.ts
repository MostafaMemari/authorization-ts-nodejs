import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../decorators/router.decorator";
import { UserModel } from "../models/user.model";

@Controller("/auth")
export class AuthController {
  @Post()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, fullname } = req.body;
      const user = await UserModel.create({
        username,
        password,
        fullname,
      });

      return res.send(user);
    } catch (error) {
      next(error);
    }
  }
}
