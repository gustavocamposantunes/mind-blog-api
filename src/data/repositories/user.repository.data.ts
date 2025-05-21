import { User } from '@/domain/entities';
import { UserRepository } from '@/domain/repositories/user';
import { UserRepositoryImpl } from '@/infra/repositories';
import { CreateUserDto } from '@/presentation/dtos';

export class UserRepositoryData implements UserRepository {
  constructor(private readonly userRepositoryImpl: UserRepositoryImpl) {}
  save(user: CreateUserDto): Promise<User> {
    return this.userRepositoryImpl.save(user);
  }
}
