import { CreateUserDto } from '@/presentation/dtos/create-user.dto';
import { User } from '../../entities';

export interface UserRepository {
  save(user: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
