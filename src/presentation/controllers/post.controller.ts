import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Request,
  Inject,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from '../dtos/create-post.dto';
import { Post as PostEntity } from '@/domain/entities/post.entity';
import { CreatePostUseCase } from '@/domain/usecases/post/create-post.usecase';
import { ListPostsResponseDto } from '../dtos/list-posts.response.dto';
import { ListPostsQueryDto } from '../dtos/list-posts.query.dto';
import { ListPostsUseCase } from '@/domain/usecases/post/list-posts.usecase';
import { FetchPostUseCase } from '@/domain/usecases/post/fetch-post.usecase';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(
    @Inject('CreatePostUseCase')
    private readonly createPostUseCase: CreatePostUseCase,
    @Inject('ListPostsUseCase')
    private readonly listPostsUseCase: ListPostsUseCase,
    @Inject('FetchPostUseCase')
    private readonly fetchPostUseCase: FetchPostUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo post' })
  @ApiResponse({
    status: 201,
    description: 'Post criado com sucesso.',
    type: PostEntity,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiBody({ type: CreatePostDto })
  async create(
    @Body() postData: CreatePostDto,
    @Request() req: any,
  ): Promise<PostEntity> {
    const userId = req.user.userId;

    console.log('userID' + userId);

    const postDataWithAuthor = {
      ...postData,
      author_id: userId,
    };

    const newPost = await this.createPostUseCase.execute(postDataWithAuthor);
    return newPost;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todos os posts com paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de posts retornada com sucesso.',
    type: ListPostsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros de query inválidos.' })
  async list(@Query() query: ListPostsQueryDto): Promise<ListPostsResponseDto> {
    const posts = await this.listPostsUseCase.execute(query);
    return posts;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca um post por ID' })
  @ApiResponse({
    status: 200,
    description: 'Post encontrado com sucesso.',
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: 'Post não encontrado.' })
  async findById(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.fetchPostUseCase.execute(id);

    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não encontrado.`);
    }

    return post;
  }
}
