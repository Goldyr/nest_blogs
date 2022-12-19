import { Blog, UsersBlog } from 'src/blogs/blog.model';
import { User } from 'src/users/user.model';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error('Value is not a string: ' + value);
  }
  return value;
};

const parseNumber = (value: unknown): number => {
  if (!isNumber(value)) {
    throw new Error('Value is not a number: ' + value);
  }
  return value;
};

export const toBlog = (object: any): Blog => {
  const newBlog: Blog = {
    id: parseString(object.id),
    title: parseString(object.title),
    author: parseString(object.author),
    url: parseString(object.url),
    likes: parseNumber(object.likes),
    user: {
      id: object.user.id,
      username: object.user.username,
      name: object.user.name,
    },
  };
  return newBlog;
};

export const toUsersBlog = (object: any): UsersBlog => {
  const newBlog: UsersBlog = {
    id: parseString(object.id),
    title: parseString(object.title),
    author: parseString(object.author),
    url: parseString(object.url),
  };
  return newBlog;
};

export const toUser = (object: any): User => {
  console.log(object);
  const newUser: User = {
    id: parseString(object.id),
    username: parseString(object.username),
    name: parseString(object.name),
    passwordHash: parseString(object.passwordHash),
    blogs: object.blogs.map((b: any): UsersBlog => {
      return toUsersBlog(b);
    }),
  };
  return newUser;
};

export const toPublicUser = (object: any): User => {
  console.log(object);
  const newUser: User = {
    id: parseString(object.id),
    username: parseString(object.username),
    name: parseString(object.name),
    blogs: object.blogs.map((b: any): UsersBlog => {
      return toUsersBlog(b);
    }),
  };
  return newUser;
};

export default {};
