import { Post } from '@/domain/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ListPostsResponseDto {
  @ApiProperty({
    description: 'Lista de posts',
    type: [Post],
  })
  posts: Post[];

  @ApiProperty({
    description: 'Número total de posts disponíveis',
    example: 100,
  })
  total: number;

  @ApiProperty({ description: 'Número de posts por página', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Página atual', example: 1 })
  page: number;
}
