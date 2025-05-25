import { User } from '@/domain/entities';
import { CreateUserDto } from '@/presentation/dtos/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

import { UserRepositoryImpl } from './user.repository.impl';
import { DBConnectionError } from '@/domain/errors';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(() => Promise.resolve('mockedSalt')),
  hash: jest.fn(() => Promise.resolve('hashedPassword123')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

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

    it('should throw a DBConnectionError if there is a database connection issue', async () => {
      const expectedHashedPassword = 'hashedPassword123';

      const userInstanceToBeCreatedAndSaved: User = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: expectedHashedPassword,
      } as User;

      const simulatedDbConnectionError = new Error(
        'connect ECONNREFUSED 127.0.0.1:3306',
      );
      simulatedDbConnectionError.name = 'ConnectionRefusedError';

      typeormRepository.create.mockReturnValue(userInstanceToBeCreatedAndSaved);
      typeormRepository.save.mockRejectedValue(simulatedDbConnectionError);

      await expect(userRepositoryImpl.save(createUserDto)).rejects.toThrow(
        DBConnectionError,
      );
      await expect(userRepositoryImpl.save(createUserDto)).rejects.toThrow(
        'Não foi possível conectar ao servidor de banco de dados.',
      );

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(
        createUserDto.password,
        'mockedSalt',
      );
      expect(typeormRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createUserDto.name,
          email: createUserDto.email,
          password: expectedHashedPassword,
        }),
      );
      expect(typeormRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createUserDto.name,
          email: createUserDto.email,
          password: expectedHashedPassword,
        }),
      );
    });

    it('should create and save a new user successfully', async () => {
      const expectedHashedPassword = 'hashedPassword123';

      const userInstanceToBeCreatedAndSaved: User = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: expectedHashedPassword,
      } as User;

      const savedUserEntity: User = {
        id: 1,
        name: createUserDto.name,
        email: createUserDto.email,
        password: expectedHashedPassword,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      } as User;

      typeormRepository.create.mockReturnValue(userInstanceToBeCreatedAndSaved);
      typeormRepository.save.mockResolvedValue(savedUserEntity);

      const result = await userRepositoryImpl.save(createUserDto);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(
        createUserDto.password,
        'mockedSalt',
      );

      expect(typeormRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createUserDto.name,
          email: createUserDto.email,
          password: expectedHashedPassword,
        }),
      );

      expect(typeormRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createUserDto.name,
          email: createUserDto.email,
          password: expectedHashedPassword,
        }),
      );

      expect(result).toEqual(savedUserEntity);
      expect(result.id).toBe(1);
      expect(result.password).toBe(expectedHashedPassword);
    });
  });
});
