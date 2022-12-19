import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';

import { Blog } from './blog.model';
import { BlogService } from './blogs.service';

@Controller('blogs')
export class blogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs(): Promise<Blog[]> {
    return await this.blogService.getBlogs();
  }

  @Post()
  async addNewBlog(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('url') url: string,
    @Body('author') author: string,
  ): Promise<Blog> {
    return await this.blogService.addBlog(title, url, author, token);
  }
}
