import { Injectable } from '@nestjs/common';

import { Post } from '@/domain/entities/post.entity';
import { FetchPostUseCase } from '@/domain/usecases/post/fetch-post.usecase';
import { PostRepositoryImpl } from '@/infra/repositories/post/post.repository.impl';

@Injectable()
export class FetchPostUseCaseImpl implements FetchPostUseCase {
  constructor(private readonly postRepository: PostRepositoryImpl) {}

  async execute(id: number): Promise<Post | null> {
    const post = await this.postRepository.findById(id);
    return post;
  }
}
