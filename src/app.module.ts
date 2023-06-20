import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: this, envFilePath: '.env' }),
    AuthModule,
    UserModule,
    TaskModule,
    CategoryModule,
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule {}
