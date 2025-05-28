import { Test, TestingModule } from '@nestjs/testing';
import { PostRepositoryImpl } from './post.repository.impl';
import { Post } from '@/domain/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PostRepositoryImpl', () => {
  let postRepositoryImpl: PostRepositoryImpl;
  let typeormRepository: MockType<Repository<Post>>;

  type MockType<T> = Partial<Record<keyof T, jest.Mock>>;

  beforeEach(async () => {
    const typeormRepositoryMock: MockType<Repository<Post>> = {
      save: jest.fn(),
      findAndCount: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostRepositoryImpl,
        {
          provide: getRepositoryToken(Post),
          useValue: typeormRepositoryMock,
        },
      ],
    }).compile();

    postRepositoryImpl = module.get<PostRepositoryImpl>(PostRepositoryImpl);
    typeormRepository = module.get<MockType<Repository<Post>>>(
      getRepositoryToken(Post),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(postRepositoryImpl).toBeDefined();
  });
});
