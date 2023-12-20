import { BlogIdDto, createBlogDto } from "./blog.dto";
import { IBlog } from "./blog.type";

export class BlogService {
  async create(blogDto: createBlogDto): Promise<string> {
    return "";
  }
  async fetchAll(): Promise<IBlog[]> {
    return [];
  }
  async fetchByID(blogId: BlogIdDto): Promise<IBlog | undefined> {
    return undefined;
  }
  async removeByID(blogId: BlogIdDto): Promise<string> {
    return "";
  }
}
