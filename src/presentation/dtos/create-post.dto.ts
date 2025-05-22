import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'O título do post',
    example: 'Meu Primeiro Post no Blog',
  })
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title: string;

  @ApiProperty({
    description: 'O conteúdo do post',
    example:
      'Este é o conteúdo do meu primeiro post no blog, cheio de informações interessantes.',
  })
  @IsString({ message: 'O conteúdo deve ser uma string.' })
  @IsNotEmpty({ message: 'O conteúdo é obrigatório.' })
  content: string;

  @ApiProperty({
    description: 'O ID do autor do post (usuário)',
    example: 1,
  })
  @IsInt({ message: 'O ID do autor deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do autor deve ser um número positivo.' })
  @IsNotEmpty({ message: 'O ID do autor é obrigatório.' })
  author_id: number;
}
