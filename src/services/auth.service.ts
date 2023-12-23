import { validateSync } from "class-validator";
import { UserModel } from "../model/user.model";
import { AuthUtils } from "../utils/AuthUtils";
import { IUser } from "../types/user.types";
import { LoginDTO, RegisterDTO } from "./../dtos/auth.dto";
import { errorHandler } from "../utils/ApiErrorHandler";

export class AuthService {
  async register(userDto: RegisterDTO): Promise<IUser> {
    errorHandler(userDto);
    const errors = validateSync(userDto);
    const checkedErrors = errorHandler(errors);
    if (checkedErrors.length > 0) throw { status: 400, message: "validation Error", errors: checkedErrors };
    const { username, password } = userDto;
    const newPassword = AuthUtils.hashPassword(password);
    const existUser = await UserModel.findOne({ username });
    if (existUser) throw { status: 400, message: "this username already exist" };
    userDto.password = newPassword;

    const user: IUser = await UserModel.create(userDto);
    return user;
  }
  async login(loginDto: LoginDTO): Promise<IUser> {
    errorHandler(loginDto);
    const { username, password } = loginDto;

    const existUser: IUser | null = await UserModel.findOne({ username });
    if (!existUser) throw { status: 401, message: "this username or password is incorrect" };

    const isTrueUser: boolean = AuthUtils.comparePassword(password, existUser.password);
    if (!isTrueUser) throw { status: 401, message: "this username or password is incorrect" };

    const token = AuthUtils.generateToken({ username, id: existUser._id });
    existUser.accessToken = token;
    await existUser.save();

    return existUser;
  }
}
