import { Post } from '@/domain/entities/post.entity';

export interface FindPostByIdUseCase {
  execute(id: number): Promise<Post | null>;
}
