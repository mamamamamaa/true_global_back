import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../schemas/categoty.entity';
import { UserModule } from '../user/user.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UserModule],
  providers: [CategoryService, JwtService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
