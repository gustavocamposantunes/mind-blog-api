import { Test, TestingModule } from '@nestjs/testing';
import { PostRepositoryImpl } from './post.repository.impl';
import { Post } from '@/domain/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { faker } from '@faker-js/faker/.';
import { DBConnectionError } from '@/domain/errors';
import { postsList } from '@/presentation/test/post';

describe('PostRepositoryImpl', () => {
  let postRepositoryImpl: PostRepositoryImpl;
  let typeormRepository: MockType<Repository<Post>>;

  type MockType<T> = Partial<Record<keyof T, jest.Mock>>;

  beforeEach(async () => {
    const typeormRepositoryMock: MockType<Repository<Post>> = {
      save: jest.fn(),
      create: jest.fn(),
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

  describe('save', () => {
    const createPostDto: CreatePostDto = {
      author_id: faker.number.int(),
      content: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
    };
    const postInstanceToBeCreatedAndSaved: Post = {
      author: {
        createdAt: faker.date.anytime(),
        email: faker.internet.email(),
        id: createPostDto.author_id,
        name: faker.person.fullName(),
        password: faker.internet.password(),
        posts: [],
        updatedAt: faker.date.anytime(),
      },
      author_id: createPostDto.author_id,
      content: faker.commerce.productDescription(),
      id: faker.number.int(),
      publishedAt: faker.date.anytime(),
      title: faker.commerce.product(),
      updatedAt: faker.date.anytime(),
    } as Post;

    it('should throw a DBConnectionError if there is a database connection issue on save', async () => {
      const simulatedDbConnectionError = new Error(
        'connect ECONNREFUSED 127.0.0.1:3306',
      );
      simulatedDbConnectionError.name = 'ConnectionRefusedError';

      typeormRepository.create.mockReturnValue(postInstanceToBeCreatedAndSaved);
      typeormRepository.save.mockRejectedValue(simulatedDbConnectionError);

      await expect(postRepositoryImpl.save(createPostDto)).rejects.toThrow(
        DBConnectionError,
      );
      await expect(postRepositoryImpl.save(createPostDto)).rejects.toThrow(
        'Não foi possível conectar ao servidor de banco de dados.',
      );

      expect(typeormRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(createPostDto),
      );
      expect(typeormRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(postInstanceToBeCreatedAndSaved),
      );
    });

    it('should create and save a new post successfully', async () => {
      typeormRepository.create.mockReturnValue(createPostDto);
      typeormRepository.save.mockReturnValue(postInstanceToBeCreatedAndSaved);

      const result = await postRepositoryImpl.save(createPostDto);

      expect(typeormRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(createPostDto),
      );

      expect(typeormRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createPostDto),
      );

      expect(result).toEqual(postInstanceToBeCreatedAndSaved);
      expect(result.id).toBe(postInstanceToBeCreatedAndSaved.id);
    });
  });

  describe('list', () => {
    it('should throw a DBConnectionError if there is a database connection issue on list', async () => {
      const simulatedDbConnectionError = new Error('connect ECONNREFUSED');
      simulatedDbConnectionError.name = 'ConnectionRefusedError';
      typeormRepository.findAndCount = jest
        .fn()
        .mockRejectedValue(simulatedDbConnectionError);

      const queryParams = { page: 1, limit: 10 };

      await expect(postRepositoryImpl.list(queryParams)).rejects.toThrow(
        DBConnectionError,
      );
      await expect(postRepositoryImpl.list(queryParams)).rejects.toThrow(
        'Não foi possível conectar ao servidor de banco de dados.',
      );
    });

    it('should return the post list', async () => {
      typeormRepository.findAndCount = jest
        .fn()
        .mockResolvedValue([postsList.posts, postsList.total]);

      const result = await postRepositoryImpl.list({});

      expect(result).toEqual(postsList);
    });
  });
});
