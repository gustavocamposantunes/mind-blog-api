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
  @ApiBody({ type: LoginUserDto })
  async login(@Body() credentials: LoginUserDto): Promise<AuthUserResponseDto> {
    const authResponse = await this.authUserUseCase.execute(credentials);
    return authResponse;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('profile')
  // @ApiOperation({ summary: 'Retorna o perfil do usuário autenticado' })
  // @ApiResponse({ status: 200, description: 'Perfil do usuário', type: User })
  // @ApiResponse({ status: 401, description: 'Não autorizado' })
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }

  // @UseGuards(AuthGuard('local'))
  // @Post('login-passport')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Login usando Passport.js Local Strategy' })
  // @ApiResponse({ status: 200, description: 'Login bem-sucedido', type: AuthUserResponseDto })
  // @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  // async loginWithPassport(@Request() req: any): Promise<AuthUserResponseDto> {
  //   const user = req.user;
  //   const payload = { sub: user.id, email: user.email, name: user.name };
  //   const accessToken = this.jwtService.sign(payload);
  //
  //   return {
  //     accessToken,
  //     user: {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //     },
  //   };
  // }
}
