import { Injectable } from '@nestjs/common';

import { ListPostsQueryDto } from '@/presentation/dtos/list-posts.query.dto';
import { ListPostsResponseDto } from '@/presentation/dtos/list-posts.response.dto';
import { PostRepositoryImpl } from '@/infra/repositories/post/post.repository.impl';
import { ListPostsUseCase } from '@/domain/usecases/post/list-posts.usecase';

@Injectable()
export class ListPostsUseCaseImpl implements ListPostsUseCase {
  constructor(private readonly postRepository: PostRepositoryImpl) {}

  async execute(query: ListPostsQueryDto): Promise<ListPostsResponseDto> {
    const postsResponse = await this.postRepository.list(query);
    return postsResponse;
  }
}
