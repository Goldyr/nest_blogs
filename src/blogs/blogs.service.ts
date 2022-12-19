import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { Blog, validToken } from './blog.model';
import { User } from '../users/user.model';

import { toBlog } from '../utils/utils';
import { SECRET } from '../utils/config';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private readonly blogModel: Model<Blog>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getBlogs(): Promise<Blog[]> {
    try {
      const result = await this.blogModel
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 });
      const blogs: Blog[] = [];
      result.map((blog) => {
        blogs.push(toBlog(blog));
      });

      return blogs as Blog[];
    } catch (error: unknown) {
      console.log(error);
      throw new Error('Error while getting blogs ' + error);
    }

    /*     blogs = blogs.map((blog) => blog);
    toBlog(blog); */
  }

  async addBlog(
    title: string,
    url: string,
    author: string,
    token: string,
  ): Promise<Blog> {
    try {
      if (!token) {
        throw new NotFoundException(`Token not found or invalid`);
      }
      const isValidToken = (object: any): validToken => {
        if (!object.id || !object.username) {
          throw new NotFoundException('not a valid token');
        }
        const token: validToken = {
          id: object.id,
          username: object.username,
        };
        return token;
      };
      const decodedToken = jwt.verify(token, SECRET);

      const validToken = isValidToken(decodedToken);

      const blog = new this.blogModel({
        title: title,
        author: author,
        url: url,
        likes: 0,
        user: validToken.id,
      });
      await blog.save();
      return blog;
    } catch (error: unknown) {
      console.log(error);
      throw new Error('Error while adding new blog ' + error);
    }
  }
}
