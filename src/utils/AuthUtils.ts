import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { Algorithm, sign, verify } from "jsonwebtoken";
import { JwtToken } from "../types/public.types";

const AccessTokenSecretKey = "BE2378478573736B435CE746585A250E";

export class AuthUtils {
  public static hashPassword(password: string): string {
    const salt: string = genSaltSync(10);
    return hashSync(password, salt);
  }
  public static comparePassword(password: string, hashPassword: string): boolean {
    return compareSync(password, hashPassword);
  }
  public static generateToken(payload: JwtToken): string {
    const now: number = new Date().getTime();
    const expiresTime: number = 1000 * 60 * 60 * 24;
    const algorithm: Algorithm = "HS512";

    return sign(payload, AccessTokenSecretKey, { expiresIn: expiresTime + now, algorithm });
  }
  public static decodeToken(token: string): JwtToken {
    return verify(token, AccessTokenSecretKey) as JwtToken;
  }
}
