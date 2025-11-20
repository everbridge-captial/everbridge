import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { UploaderRepository } from './uploader.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Upload])],
  providers: [UploaderService, UploaderRepository],
  controllers: [UploaderController],
  exports: [UploaderService],
})
export class UploaderModule {}
