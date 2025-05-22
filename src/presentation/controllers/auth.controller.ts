import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from '../dtos/login-user.dto';
import { AuthUserResponseDto } from '../dtos/auth-user.response.dto';
import { AuthUserUseCase } from '@/domain/usecases/auth/auth-user.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthUserUseCase')
    private readonly authUserUseCase: AuthUserUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Autentica um usuário e retorna um token de acesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido',
    type: AuthUserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiBody({
    description: 'Dados para realizar autenticação',
    schema: {
      example: {
        email: 'Ettie94@yahoo.com',
        password: 'ZbEOMbWZC5hjfEU',
      },
    },
  })
  async login(@Body() credentials: LoginUserDto): Promise<AuthUserResponseDto> {
    const authResponse = await this.authUserUseCase.execute(credentials);
    return authResponse;
  }
}
