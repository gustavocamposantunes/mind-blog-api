import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@/domain/entities/post.entity';
import { PostController } from '@/presentation/controllers/post.controller';
import { PostRepositoryImpl } from '@/infra/repositories/post/post.repository.impl';
import { CreatePostUseCaseImpl } from '@/data/usecases/post/create-post.usecase.impl';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthModule],
  providers: [
    PostRepositoryImpl,
    {
      provide: 'CreatePostUseCase',
      useClass: CreatePostUseCaseImpl,
    },
  ],
  controllers: [PostController],
  exports: [PostRepositoryImpl],
})
export class PostModule {}
