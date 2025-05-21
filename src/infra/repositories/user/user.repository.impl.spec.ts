import { User } from '@/domain/entities';
import { CreateUserDto } from '@/presentation/dtos/create-user-dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { UserRepositoryImpl } from './user.repository.impl';
import { DBConnectionError } from '@/domain/errors';

describe('UserRepositoryImpl', () => {
  let userRepositoryImpl: UserRepositoryImpl;
  let typeormRepository: MockType<Repository<User>>;

  type MockType<T> = Partial<Record<keyof T, jest.Mock>>;

  beforeEach(async () => {
    const typeormRepositoryMock: MockType<Repository<User>> = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryImpl,
        {
          provide: getRepositoryToken(User),
          useValue: typeormRepositoryMock,
        },
      ],
    }).compile();

    userRepositoryImpl = module.get<UserRepositoryImpl>(UserRepositoryImpl);
    typeormRepository = module.get<MockType<Repository<User>>>(
      getRepositoryToken(User),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userRepositoryImpl).toBeDefined();
  });

  describe('save', () => {
    const createUserDto: CreateUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    it('should create and save a new user successfully', async () => {
      const userEntity = {
        id: 1,
        ...createUserDto,
      } as User;

      typeormRepository.create.mockReturnValue(userEntity);
      typeormRepository.save.mockResolvedValue(userEntity);

      const result = await userRepositoryImpl.save(createUserDto);

      expect(typeormRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(typeormRepository.save).toHaveBeenCalledWith(userEntity);
      expect(result).toEqual(userEntity);
      expect(result.id).toBe(1);
    });

    it('should throw a DBConnectionError if there is a database connection issue', async () => {
      const userInstance = new User();
      Object.assign(userInstance, { id: 1, ...createUserDto });

      const simulatedDbConnectionError = new Error(
        'connect ECONNREFUSED 127.0.0.1:3306',
      );
      simulatedDbConnectionError.name = 'ConnectionRefusedError';

      typeormRepository.create.mockReturnValue(userInstance);
      typeormRepository.save.mockRejectedValue(simulatedDbConnectionError);

      await expect(userRepositoryImpl.save(createUserDto)).rejects.toThrow(
        DBConnectionError,
      );
      await expect(userRepositoryImpl.save(createUserDto)).rejects.toThrow(
        'Não foi possível conectar ao servidor de banco de dados.',
      );

      expect(typeormRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(typeormRepository.save).toHaveBeenCalledWith(expect.any(User));
      expect(typeormRepository.save).toHaveBeenCalledWith(userInstance);
    });
  });
});
