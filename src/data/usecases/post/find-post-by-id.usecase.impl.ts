import { Injectable } from '@nestjs/common';

import { Post } from '@/domain/entities/post.entity';
import { FindPostByIdUseCase } from '@/domain/usecases/post/find-post-by-id.usecase';
import { PostRepositoryImpl } from '@/infra/repositories/post/post.repository.impl';

@Injectable()
export class FindPostByIdUseCaseImpl implements FindPostByIdUseCase {
  constructor(private readonly postRepository: PostRepositoryImpl) {}

  async execute(id: number): Promise<Post | null> {
    const post = await this.postRepository.findById(id);
    return post;
  }
}
