import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { CreatePostDto } from '../dtos/create-post.dto';
import { faker } from '@faker-js/faker/.';
import { Post } from '@/domain/entities/post.entity';
import { CreatePostUseCase } from '@/domain/usecases/post/create-post.usecase';

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

  it('should create a post correctly', async () => {
    const postData: CreatePostDto = {
      author_id: faker.number.int(),
      title: faker.commerce.productName(),
      content: faker.lorem.paragraphs(3),
    };

    const expectedPost: Post = {
      title: postData.title,
      content: postData.content,
      author_id: postData.author_id,
      author: {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        posts: [],
      },
      id: 2,
      publishedAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
    };

    jest.spyOn(createPostUseCase, 'execute').mockResolvedValue(expectedPost);

    const mockRequest = {
      user: {
        userId: expectedPost.author_id,
      },
    };

    const result = await postController.create(postData, mockRequest);

    expect(result).toEqual(expectedPost);
    expect(createPostUseCase.execute).toHaveBeenCalledWith(postData);
    expect(createPostUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
