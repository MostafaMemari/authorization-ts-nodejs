import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../decorators/router.decorator";
import { UserModel } from "../models/user.model";
import { compareHashString, errorHandler, jwtGenerator } from "../modules/utils";
import { IUser } from "../types/user.types";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "./auth.dto";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

const authService: AuthService = new AuthService();

@Controller("/auth")
export class AuthController {
  @Post()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto: RegisterDTO = plainToClass(RegisterDTO, req.body, { excludeExtraneousValues: true });
      const user: IUser = await authService.register(registerDto);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  @Post()
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const user = await authService.login({ username, password });

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
