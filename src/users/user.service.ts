import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toPublicUser } from '../utils/utils';
import { User, PublicUser } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userSchema: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const result = await this.userSchema
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
    if (!result) {
      throw new Error('No users found');
    }
    const users: PublicUser[] = result.map((r) => toPublicUser(r));

    return users;
  }

  async addUser(username: string, password: string, name: string) {
    if (!(username && password)) {
      throw new Error('Empty or wrong inputs');
    }
    if (username.length < 3 || password.length < 3) {
      throw new Error('Username or password length too short');
    }
    if (await this.userSchema.findOne({ username })) {
      throw new Error('User already exists');
    }

    try {
      console.log(bcrypt.hash);
      const hash = await bcrypt.hash(password, 10);

      const user = new this.userSchema({
        username,
        name,
        passwordHash: hash,
      });

      return await user.save();
    } catch (error) {
      console.log(error);
    }
  }
}
