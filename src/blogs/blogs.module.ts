import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { blogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { blogSchema } from './blog.schema';

import { userSchema } from '../users/user.schema';

import { tokenExtractor } from '../utils/tokenExtractor.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Blog', schema: blogSchema },
      { name: 'User', schema: userSchema },
    ]),
  ],
  controllers: [blogController],
  providers: [BlogService],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(tokenExtractor)
      .forRoutes({ path: 'blogs', method: RequestMethod.POST });
  }
}
