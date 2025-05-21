import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/infra/database/database.providers';
import { UserModule } from '@/presentation/modules/user.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
})
export class AppModule {}
