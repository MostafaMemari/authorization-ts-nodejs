import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { Algorithm, sign } from "jsonwebtoken";
import { UserModel } from "../models/user.model";

const AccessTokenSecretKey = "BE2378478573736B435CE746585A250E";

export function HashString(data: string): string {
  const salt: string = genSaltSync(10);
  const hashedString: string = hashSync(data, salt);
  return hashedString;
}
export function compareHashString(data: string, encrypted: string): boolean {
  return compareSync(data, encrypted);
}

export async function jwtGenerator(payload: any): Promise<void> {
  const { id, username } = payload;
  const user = await UserModel.findById(id);
  if (!user) throw { status: 404, message: "not found user" };

  const expiresIn = new Date().getTime() + 1000 * 60 * 60 * 24;
  const algorithm: Algorithm = "HS512";

  sign(payload, AccessTokenSecretKey, { expiresIn, algorithm }, async (error, token) => {
    if (!error && token) {
      user.accessToken = token;
      await user.save();
    }
  });
}
