import { Injectable } from '@nestjs/common';
import { HumanTask } from './entities';
import { BaseRepository } from '@common/base/base.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HumanTaskRepository extends BaseRepository<HumanTask> {
  constructor(
    @InjectRepository(HumanTask)
    private readonly humanTaskRepository: Repository<HumanTask>,
  ) {
    super(humanTaskRepository);
  }
}
