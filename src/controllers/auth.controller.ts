import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../decorators/router.decorator";
import { UserModel } from "../models/user.model";
import { HashString, compareHashString, jwtGenerator } from "../modules/utils";
import { FindUser } from "../types/user.types";

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

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  @Post()
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const existUser: FindUser | null = await UserModel.findOne({ username });
      if (!existUser) throw { status: 401, message: "this username or password is incorrect" };

      const isTrueUser: boolean = compareHashString(password, existUser.password);
      if (!isTrueUser) throw { status: 401, message: "this username or password is incorrect" };

      await jwtGenerator({ username, id: existUser._id });
      const user = await UserModel.findById(existUser._id, { password: 0 });

      return res.json({
        statusCode: 200,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
