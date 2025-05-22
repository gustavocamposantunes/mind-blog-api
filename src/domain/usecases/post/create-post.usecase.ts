import { Post } from '@/domain/entities/post.entity';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';

export interface CreatePostUseCase {
  execute(postData: CreatePostDto): Promise<Post>;
}
