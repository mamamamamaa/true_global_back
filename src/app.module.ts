import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';

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
