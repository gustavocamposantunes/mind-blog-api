import { User } from '@/domain/entities';
import { CreateUserDto } from '@/presentation/dtos/create-user-dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { UserRepositoryImpl } from './user.repository.impl';

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

    it.skip('should throw an error if saving fails', async () => {
      const errorMessage = 'Database error';
      typeormRepository.create.mockReturnValue({ ...createUserDto } as User);
      typeormRepository.save.mockRejectedValue(new Error(errorMessage));

      await expect(userRepositoryImpl.save(createUserDto)).rejects.toThrow(
        errorMessage,
      );

      expect(typeormRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(typeormRepository.save).toHaveBeenCalled();
    });
  });
});
