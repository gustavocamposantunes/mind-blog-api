import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos';
import { User } from '@/domain/entities';
import { CreateUserUseCase } from '@/domain/usecases/user';
import { faker } from '@faker-js/faker';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({
    description: 'Dados para criação de usuário',
    schema: {
      example: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    },
  })
  async create(@Body() userData: CreateUserDto): Promise<User> {
    if (!userData.name || !userData.email || !userData.password) {
      throw new BadRequestException('Missing required fields');
    }

    return this.createUserUseCase.execute(userData);
  }
}
