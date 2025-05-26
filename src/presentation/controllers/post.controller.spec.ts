import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { CreatePostUseCase } from '@/domain/usecases/post/create-post.usecase';
import { expectedPost, mockRequest, postData } from '../test/post';
import { UnauthorizedException } from '@nestjs/common';

describe('PostController', () => {
  let postController: PostController;
  let createPostUseCase: CreatePostUseCase;

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
          provide: 'FetchPostUseCase',
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    createPostUseCase = module.get<CreatePostUseCase>('CreatePostUseCase');
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
});
