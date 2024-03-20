import { Module } from '@nestjs/common';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/datasource';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, HealthModule, ConfigModule.forRoot()],
})
export class AppModule {}
