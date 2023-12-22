import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Get, Post } from "../decorators/router.decorator";
import { BlogService } from "./blog.service";
import { createBlogDto } from "./blog.dto";
import { plainToClass } from "class-transformer";

import { IBlog } from "./blog.type";
const blogService: BlogService = new BlogService();

@Controller("/blog")
export class BlogController {
  @Post()
  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: createBlogDto = plainToClass(createBlogDto, req.body);
      const blog: IBlog = await blogService.create(blogDto);
      return res.status(201).json({ statusCode: 201, message: "created", data: { blog } });
    } catch (error) {
      next(error);
    }
  }
  @Get()
  async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    const blogs: IBlog[] = await blogService.fetchAll();
    return res.send(blogs);
  }
  @Get()
  getBlogByID() {}
  @Delete()
  RemoveBlogByID() {}
}
