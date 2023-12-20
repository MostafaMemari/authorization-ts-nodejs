import { Controller, Delete, Get, Post } from "../decorators/router.decorator";
import { BlogService } from "./blog.service";
const blogService: BlogService = new BlogService();

@Controller("/blog")
export class BlogController {
  @Post()
  createBlog() {}
  @Get()
  getAllBlogs() {}
  @Get()
  getBlogByID() {}
  @Delete()
  RemoveBlogByID() {}
}
