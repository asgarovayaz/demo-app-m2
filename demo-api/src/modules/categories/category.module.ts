import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryContentEntity } from './entities/category-content.entity';
import { CategoryEntity } from './entities/category.entity';
import { CategoryAdminController } from './category-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryContentEntity])],
  controllers: [CategoryController, CategoryAdminController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
