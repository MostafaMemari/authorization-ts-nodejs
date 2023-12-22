import { validateSync } from "class-validator";
import { UserModel } from "../models/user.model";
import { HashString, compareHashString, errorHandler, jwtGenerator } from "../modules/utils";
import { IUser } from "../types/user.types";
import { LoginDTO, RegisterDTO } from "./auth.dto";

export class AuthService {
  async register(userDto: RegisterDTO): Promise<IUser> {
    const errors = validateSync(userDto);
    const checkedErrors = errorHandler(errors);
    if (checkedErrors.length > 0) throw { status: 400, message: "validation Error", errors: checkedErrors };
    const { username, password } = userDto;
    const newPassword = HashString(password);
    const existUser = await UserModel.findOne({ username });
    if (existUser) throw { status: 400, message: "this username already exist" };
    userDto.password = newPassword;

    const user: IUser = await UserModel.create(userDto);
    return user;
  }
  async login(userDto: LoginDTO): Promise<IUser | null> {
    const { username, password } = userDto;
    const existUser: IUser | null = await UserModel.findOne({ username });
    if (!existUser) throw { status: 401, message: "this username or password is incorrect" };

    const isTrueUser: boolean = compareHashString(password, existUser.password);
    if (!isTrueUser) throw { status: 401, message: "this username or password is incorrect" };

    await jwtGenerator({ username, id: existUser._id });
    const user = await UserModel.findById(existUser._id, { password: 0 });
    return user;
  }
}
