import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CategoryModule } from '@modules/categories/category.module';
import { UserModule } from '@modules/users/user.module';
import { PostContentEntity } from './entities/post-content.entity';
import { PostAdminController } from './post-admin.controller';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostContentEntity]),
    forwardRef(() => CategoryModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PostController, PostAdminController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
