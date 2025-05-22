import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ListPostsQueryDto {
  @ApiPropertyOptional({
    description: 'Número da página a ser retornada',
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt({ message: 'A página deve ser um número inteiro.' })
  @Min(1, { message: 'A página deve ser no mínimo 1.' })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de itens por página',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @Type(() => Number)
  @IsInt({ message: 'O limite deve ser um número inteiro.' })
  @Min(1, { message: 'O limite deve ser no mínimo 1.' })
  @Max(100, { message: 'O limite máximo é 100.' })
  @IsOptional()
  limit?: number = 10;
}
