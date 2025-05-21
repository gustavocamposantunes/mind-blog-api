import { User } from '@/domain/entities';
import { DBConnectionError } from '@/domain/errors';
import { UserRepository } from '@/domain/repositories/user/user.repository';
import { CreateUserDto } from '@/presentation/dtos/create-user-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly typeormRepository: Repository<User>,
  ) {}
  async save(data: CreateUserDto): Promise<User> {
    try {
      const newUser = this.typeormRepository.create(data);
      const savedUser = await this.typeormRepository.save(newUser);
      return savedUser;
    } catch (error) {
      if (error.message && error.message.includes('connect ECONNREFUSED')) {
        throw new DBConnectionError(
          'Não foi possível conectar ao servidor de banco de dados.',
        );
      }

      throw error;
    }
  }
}
