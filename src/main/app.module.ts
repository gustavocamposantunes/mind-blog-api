import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/infra/database/database.providers';
import { UserModule, AuthModule } from '@/infra/modules';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
