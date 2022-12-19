import { UsersBlog } from '../blogs/blog.model';

export interface User {
  id: string;
  username: string;
  name: string;
  passwordHash?: string;
  blogs?: UsersBlog[];
}

export type PublicUser = Omit<User, 'passwordHash'>;
