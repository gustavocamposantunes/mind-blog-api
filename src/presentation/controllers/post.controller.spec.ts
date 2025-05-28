import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import {
  CreatePostUseCase,
  FindPostByIdUseCase,
  ListPostsUseCase,
} from '@/domain/usecases/post';
import { expectedPost, mockRequest, postData, postsList } from '../test/post';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('PostController', () => {
  let postController: PostController;
  let createPostUseCase: CreatePostUseCase;
  let listPostsUseCase: ListPostsUseCase;
  let findPostByIdUseCase: FindPostByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: 'CreatePostUseCase',
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: 'ListPostsUseCase',
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: 'FindPostByIdUseCase',
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    createPostUseCase = module.get<CreatePostUseCase>('CreatePostUseCase');
    listPostsUseCase = module.get<ListPostsUseCase>('ListPostsUseCase');
    findPostByIdUseCase = module.get<FindPostByIdUseCase>(
      'FindPostByIdUseCase',
    );
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  describe('create', () => {
    it('should throw UnauthorizedException when createPostUseCase throws it', async () => {
      const unauthorizedException = new UnauthorizedException(
        'Usuário não autorizado para criar este tipo de post.',
      );
      (createPostUseCase.execute as jest.Mock).mockRejectedValueOnce(
        unauthorizedException,
      );

      await expect(
        postController.create(postData, mockRequest),
      ).rejects.toThrow(unauthorizedException);

      expect(createPostUseCase.execute).toHaveBeenCalledWith({
        ...postData,
        author_id: mockRequest.user.userId,
      });
      expect(createPostUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('should create a post correctly', async () => {
      jest.spyOn(createPostUseCase, 'execute').mockResolvedValue(expectedPost);

      const result = await postController.create(postData, mockRequest);

      expect(result).toEqual(expectedPost);
      expect(createPostUseCase.execute).toHaveBeenCalledWith(postData);
      expect(createPostUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('list', () => {
    it('should thrown a BadRequestException if query parameters are invalid', async () => {
      const invalidQuery = { page: -1, limit: 0 };

      jest
        .spyOn(listPostsUseCase, 'execute')
        .mockRejectedValue(
          new BadRequestException('Parâmetros de query inválidos.'),
        );

      await expect(postController.list(invalidQuery)).rejects.toThrow(
        BadRequestException,
      );
      expect(listPostsUseCase.execute).toHaveBeenCalledWith(invalidQuery);
      expect(listPostsUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('should list posts correctly', async () => {
      jest.spyOn(listPostsUseCase, 'execute').mockResolvedValue(postsList);

      const result = await postController.list({ page: 1, limit: 10 });

      expect(result).toEqual(postsList);
      expect(listPostsUseCase.execute).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(listPostsUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException if post is not found', async () => {
      const postId = 1;
      jest.spyOn(findPostByIdUseCase, 'execute').mockResolvedValue(null);

      await expect(postController.findById(postId)).rejects.toThrow(
        `Post com ID ${postId} não encontrado.`,
      );
      expect(findPostByIdUseCase.execute).toHaveBeenCalledWith(postId);
      expect(findPostByIdUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
