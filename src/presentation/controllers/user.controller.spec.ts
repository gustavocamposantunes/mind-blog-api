import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '@/domain/usecases/user';
import { CreateUserDto } from '../dtos';
import { faker } from '@faker-js/faker/.';
import { User } from '@/domain/entities';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'CreateUserUseCase',
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    createUserUseCase = module.get<CreateUserUseCase>('CreateUserUseCase');
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const userData: CreateUserDto = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };

    const expectedUser: User = {
      id: 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
    };

    jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(expectedUser);

    const result = await userController.create(userData);

    expect(result).toEqual(expectedUser);
    expect(createUserUseCase.execute).toHaveBeenCalledWith(userData);
    expect(createUserUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if required field is missing', async () => {
    const invalidUserData = {} as CreateUserDto;

    const validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    await expect(
      validationPipe.transform(invalidUserData, {
        type: 'body',
        metatype: CreateUserDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
