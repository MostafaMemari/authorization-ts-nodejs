import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../decorators/router.decorator";
import { UserModel } from "../models/user.model";
import { HashString } from "../modules/utils";

@Controller("/auth")
export class AuthController {
  @Post()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, fullname } = req.body;
      const newPassword = HashString(password);
      const existUser = await UserModel.findOne({ username });
      if (existUser) throw { status: 400, message: "this username already exist" };
      const user = await UserModel.create({
        username,
        password: newPassword,
        fullname,
      });

      return res.send(user);
    } catch (error) {
      next(error);
    }
  }
}
