import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';

describe('PostController', () => {
  let postController: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: 'CreatePostUseCase',
          useClass: jest.fn(),
        },
        {
          provide: 'ListPostsUseCase',
          useClass: jest.fn(),
        },
        {
          provide: 'FetchPostUseCase',
          useClass: jest.fn(),
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });
});
