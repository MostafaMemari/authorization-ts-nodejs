import { BlogIdDto, createBlogDto } from "./blog.dto";
import { IBlog } from "./blog.type";
import { validateSync } from "class-validator";
import { errorHandler } from "../modules/utils";
import { BlogModel } from "../models/blog.model";
import { FindDoc } from "../types/public.types";

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
  async fetchByID(blogId: BlogIdDto): Promise<FindDoc<IBlog>> {
    const blog: FindDoc<IBlog> = await BlogModel.findById(blogId.id);
    if (!blog) throw { status: 404, message: "not found Blog" };
    return blog;
  }
  async removeByID(blogId: BlogIdDto): Promise<string> {
    const blog: FindDoc<IBlog> = await this.fetchByID(blogId);
    const deleteResult: any = await BlogModel.deleteOne({ _id: blogId.id });
    if (deleteResult.deletedCount > 0) return "deleted blog successfully";

    return "error : cannot remove blog";
  }
}
