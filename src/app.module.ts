import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URI } from './utils/config';
import { BlogModule } from './blogs/blogs.module';
import { UserModule } from './users/user.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    LoginModule,
    UserModule,
    BlogModule,
    MongooseModule.forRoot(MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
