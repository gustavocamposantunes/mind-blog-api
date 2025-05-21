import { LoginUserDto } from '@/presentation/dtos/login-user.dto';
import { AuthUserResponseDto } from '@/presentation/dtos/auth-user.response.dto';

export interface AuthUserUseCase {
  execute(credentials: LoginUserDto): Promise<AuthUserResponseDto>;
}
