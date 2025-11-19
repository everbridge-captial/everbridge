import { CacheModule } from '@common/cache';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';

@Module({
  imports: [CacheModule, ConfigModule, DatabaseModule],
  exports: [CacheModule, ConfigModule, DatabaseModule],
})
export class CommonModule {}
