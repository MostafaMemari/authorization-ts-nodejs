import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import { BlogIdDto, createBlogDto } from "../dtos/blog.dto";
import { plainToClass } from "class-transformer";
import { IBlog } from "../types/blog.type";
import { BlogService } from "../services/blog.service";
import { FindDoc } from "../types/public.types";

@Controller("blog")
export class BlogController {
  private blogService: BlogService = new BlogService();

  @Post()
  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: createBlogDto = plainToClass(createBlogDto, req.body);
      const blog: IBlog = await this.blogService.create(blogDto);
      return res.status(201).json({ statusCode: 201, message: "created", data: { blog } });
    } catch (error) {
      next(error);
    }
  }
  @Get()
  async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs: IBlog[] = await this.blogService.fetchAll();

      return res.json({
        statusCode: 200,
        data: {
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  @Get("/find/:id")
  async getBlogByID(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params);
      const blog: FindDoc<IBlog> = await this.blogService.fetchByID(blogDto);

      return res.json({
        statusCode: 200,
        data: {
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  @Delete("/delete/:id")
  async RemoveBlogByID(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params);
      const message: string = await this.blogService.removeByID(blogDto);

      return res.json({
        statusCode: 200,
        message,
      });
    } catch (error) {
      next(error);
    }
  }
}
