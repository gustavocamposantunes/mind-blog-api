import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthUserUseCase } from '@/domain/usecases/auth/auth-user.use-case';
import { LoginUserDto } from '@/presentation/dtos/login-user.dto';
import { AuthUserResponseDto } from '@/presentation/dtos/auth-user.response.dto';
import { UserRepositoryImpl } from '@/infra/repositories';

@Injectable()
export class AuthUserUseCaseImpl implements AuthUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
    private readonly jwtService: JwtService,
  ) {}

  async execute(credentials: LoginUserDto): Promise<AuthUserResponseDto> {
    const { email, password } = credentials;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
