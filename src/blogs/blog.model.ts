import { User } from '../users/user.model';

export interface Blog {
  id: string;
  title: string;
  author: string;
  url?: string;
  likes: number;
  user?: User;
}

export type UsersBlog = Omit<Blog, 'likes'>;

export interface validToken {
  id: string;
  username: string;
}
