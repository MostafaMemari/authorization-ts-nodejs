import { UserModel } from "../models/user.model";
import { HashString } from "../modules/utils";
import { IUser } from "../types/user.types";
import { RegisterDTO } from "./auth.dto";

export class AuthService {
  async register(userDto: RegisterDTO): Promise<IUser> {
    const { username, password } = userDto;
    const newPassword = HashString(password);
    const existUser = await UserModel.findOne({ username });
    if (existUser) throw { status: 400, message: "this username already exist" };
    userDto.password = newPassword;

    const user: IUser = await UserModel.create(userDto);
    return user;
  }
}
