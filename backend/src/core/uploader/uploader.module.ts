import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Upload])],
  providers: [UploaderService],
  controllers: [UploaderController],
  exports: [UploaderService],
})
export class UploaderModule {}
