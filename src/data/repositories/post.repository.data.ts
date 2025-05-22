import { Injectable } from '@nestjs/common';

import { Post } from '@/domain/entities/post.entity';
import { PostRepository } from '@/domain/repositories/post/post.repository';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { PostRepositoryImpl } from '@/infra/repositories/post/post.repository.impl';
import { ListPostsQueryDto } from '@/presentation/dtos/list-posts.query.dto';
import { ListPostsResponseDto } from '@/presentation/dtos/list-posts.response.dto';

@Injectable()
export class PostRepositoryData implements PostRepository {
  constructor(private readonly postRepositoryImpl: PostRepositoryImpl) {}

  async save(postData: CreatePostDto): Promise<Post> {
    return this.postRepositoryImpl.save(postData);
  }

  async list(query: ListPostsQueryDto): Promise<ListPostsResponseDto> {
    return this.postRepositoryImpl.list(query);
  }

  async findById(id: number): Promise<Post | null> {
    return this.postRepositoryImpl.findById(id);
  }
}
