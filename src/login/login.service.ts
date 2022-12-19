import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../utils/config';

@Injectable()
export class LoginService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async login(username: string, password: string) {
    try {
      const user = await this.userModel.findOne({ username: username });
      if (!user) {
        throw new Error('user not found');
      }
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!passwordCorrect) {
        throw new Error('incorrect password');
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      };

      const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 });
      return token;
    } catch (error) {
      console.log(error);
    }
  }
}
