import { Post } from '@/domain/entities/post.entity';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { ListPostsQueryDto } from '@/presentation/dtos/list-posts.query.dto';
import { ListPostsResponseDto } from '@/presentation/dtos/list-posts.response.dto';

export interface PostRepository {
  save(postData: CreatePostDto): Promise<Post>;
  list(query: ListPostsQueryDto): Promise<ListPostsResponseDto>;
  findById(id: number): Promise<Post | null>;
}
