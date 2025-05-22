import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '@/domain/entities/post.entity';
import { PostRepository } from '@/domain/repositories/post/post.repository';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { DBConnectionError } from '@/domain/errors';
import { ListPostsQueryDto } from '@/presentation/dtos/list-posts.query.dto';
import { ListPostsResponseDto } from '@/presentation/dtos/list-posts.response.dto';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly typeormRepository: Repository<Post>,
  ) {}

  async save(postData: CreatePostDto): Promise<Post> {
    try {
      const newPost = this.typeormRepository.create(postData);

      const savedPost = await this.typeormRepository.save(newPost);
      return savedPost;
    } catch (error) {
      if (error.message && error.message.includes('connect ECONNREFUSED')) {
        throw new DBConnectionError(
          'Não foi possível conectar ao servidor de banco de dados.',
        );
      }
      throw error;
    }
  }

  async list(query: ListPostsQueryDto): Promise<ListPostsResponseDto> {
    try {
      const { page = 1, limit = 10 } = query;
      const skip = (page - 1) * limit;

      const [posts, total] = await this.typeormRepository.findAndCount({
        skip: skip,
        take: limit,
        order: { publishedAt: 'DESC' },
      });

      return {
        posts: posts,
        total: total,
        page: page,
        limit: limit,
      };
    } catch (error) {
      if (error.message && error.message.includes('connect ECONNREFUSED')) {
        throw new DBConnectionError(
          'Não foi possível conectar ao servidor de banco de dados.',
        );
      }
      throw error;
    }
  }
}
