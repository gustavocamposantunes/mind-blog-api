import { User } from '@/domain/entities';
import { CreateUserUseCase } from '@/domain/usecases/user';
import { UserRepositoryImpl } from '@/infra/repositories';
import { CreateUserDto } from '@/presentation/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async execute(userData: CreateUserDto): Promise<User> {
    return this.userRepository.save(userData);
  }
}
