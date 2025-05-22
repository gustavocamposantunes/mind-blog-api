import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '@/domain/entities/post.entity';
import { PostRepository } from '@/domain/repositories/post/post.repository';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { DBConnectionError } from '@/domain/errors';

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
}
