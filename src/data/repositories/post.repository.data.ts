import { Injectable } from '@nestjs/common';

import { Post } from '@/domain/entities/post.entity';
import { PostRepository } from '@/domain/repositories/post/post.repository'; // Interface do repositório
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { PostRepositoryImpl } from '@/infra/repositories/post/post.repository.impl';

@Injectable()
export class PostRepositoryData implements PostRepository {
  constructor(private readonly postRepositoryImpl: PostRepositoryImpl) {}

  async save(postData: CreatePostDto): Promise<Post> {
    return this.postRepositoryImpl.save(postData);
  }
}
