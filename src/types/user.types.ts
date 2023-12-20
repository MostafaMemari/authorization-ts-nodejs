import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  username: string;
  password: string;
  accessToken?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}
export type FindUser = (IUser & { _id: ObjectId }) | null;
