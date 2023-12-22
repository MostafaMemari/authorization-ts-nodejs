import { BlogIdDto, createBlogDto } from "./blog.dto";
import { IBlog } from "./blog.type";
import { validateSync } from "class-validator";
import { errorHandler } from "../modules/utils";
import { BlogModel } from "../models/blog.model";

export class BlogService {
  async create(blogDto: createBlogDto): Promise<IBlog> {
    const errors = validateSync(blogDto);
    const checkedErrors = errorHandler(errors);
    if (checkedErrors.length > 0) throw { status: 400, message: "validation Error", errors: checkedErrors };

    const blog: IBlog = await BlogModel.create(blogDto);
    return blog;
  }
  async fetchAll(): Promise<IBlog[]> {
    const blogs: IBlog[] = await BlogModel.find({});
    return blogs;
  }
  async fetchByID(blogId: BlogIdDto): Promise<IBlog | undefined> {
    return undefined;
  }
  async removeByID(blogId: BlogIdDto): Promise<string> {
    return "";
  }
}
