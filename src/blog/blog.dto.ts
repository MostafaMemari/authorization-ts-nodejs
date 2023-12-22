import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class createBlogDto {
  @IsDefined()
  @Expose()
  title: string;
  @IsDefined()
  @Expose()
  text: string;
  @IsDefined()
  @Expose()
  author: string;
}
export class BlogIdDto {}
