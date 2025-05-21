import { Module } from '@nestjs/common';
import { UserController } from '../controllers';
import { UserRepositoryImpl } from '@/infra/repositories';
import { CreateUserUseCaseImpl } from '@/data/usecases/user/create-user-usercase.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/domain/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepositoryImpl,
    {
      provide: 'CreateUserUseCase',
      useClass: CreateUserUseCaseImpl,
    },
  ],
  controllers: [UserController],
  exports: [UserRepositoryImpl],
})
export class UserModule {}
