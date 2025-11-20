import { Injectable } from '@nestjs/common';
import { Upload } from './entities/upload.entity';
import { BaseRepository } from '@common/base/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UploaderRepository extends BaseRepository<Upload> {
  constructor(
    @InjectRepository(Upload)
    private readonly uploaderRepository: Repository<Upload>,
  ) {
    super(uploaderRepository);
  }
}
