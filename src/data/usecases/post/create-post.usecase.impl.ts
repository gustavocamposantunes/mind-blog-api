import { Injectable } from '@nestjs/common';

import { Post } from '@/domain/entities/post.entity';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { CreatePostUseCase } from '@/domain/usecases/post/create-post.usecase';
import { PostRepositoryImpl } from '@/infra/repositories/post/post.repository.impl';

@Injectable()
export class CreatePostUseCaseImpl implements CreatePostUseCase {
  constructor(private readonly postRepository: PostRepositoryImpl) {}

  async execute(postData: CreatePostDto): Promise<Post> {
    const newPost = await this.postRepository.save(postData);
    return newPost;
  }
}
