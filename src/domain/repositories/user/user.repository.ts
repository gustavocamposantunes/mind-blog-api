import { CreateUserDto } from '@/presentation/dtos/create-user-dto';
import { User } from '../../entities/user.entity';

export interface UserRepository {
  save(user: CreateUserDto): Promise<User>;
}
