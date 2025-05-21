import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/domain/entities/user.entity';
import { UserRepositoryImpl } from '@/infra/repositories';

import { AuthController } from '@/presentation/controllers';
import { AuthUserUseCaseImpl } from '@/data/usecases/auth/auth-user.use-case.impl';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: UserRepositoryImpl,
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'AuthUserUseCase',
      useClass: AuthUserUseCaseImpl,
    },
  ],
  controllers: [AuthController],
  exports: [UserRepositoryImpl, 'AuthUserUseCase', JwtModule],
})
export class AuthModule {}
