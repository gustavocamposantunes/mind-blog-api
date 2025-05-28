import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { CreatePostUseCase, ListPostsUseCase } from '@/domain/usecases/post';
import { expectedPost, mockRequest, postData } from '../test/post';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('PostController', () => {
  let postController: PostController;
  let createPostUseCase: CreatePostUseCase;
  let listPostsUseCase: ListPostsUseCase;

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
  });
});
