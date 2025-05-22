import { Post } from '@/domain/entities/post.entity';

export interface FetchPostUseCase {
  execute(id: number): Promise<Post | null>;
}
