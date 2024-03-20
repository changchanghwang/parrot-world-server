import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getOrmConfig } from '@config';

@Module({ imports: [TypeOrmModule.forRoot(getOrmConfig() as TypeOrmModuleOptions)] })
export class DatabaseModule {}
