import { ListPostsResponseDto } from '@/presentation/dtos/list-posts.response.dto';
import { ListPostsQueryDto } from '@/presentation/dtos/list-posts.query.dto';

export interface ListPostsUseCase {
  execute(query: ListPostsQueryDto): Promise<ListPostsResponseDto>;
}
