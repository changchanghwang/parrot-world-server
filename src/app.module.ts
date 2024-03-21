import { Module } from '@nestjs/common';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/datasource';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@users/module';

@Module({
  imports: [DatabaseModule, HealthModule, ConfigModule.forRoot(), UserModule],
})
export class AppModule {}
