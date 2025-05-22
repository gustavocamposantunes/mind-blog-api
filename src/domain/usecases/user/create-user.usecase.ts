import { User } from '@/domain/entities';
import { CreateUserDto } from '@/presentation/dtos';

export interface CreateUserUseCase {
  execute(userData: CreateUserDto): Promise<User>;
}
