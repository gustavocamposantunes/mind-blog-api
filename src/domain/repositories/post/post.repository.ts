import { Post } from '@/domain/entities/post.entity';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';

export interface PostRepository {
  save(postData: CreatePostDto): Promise<Post>;
}
