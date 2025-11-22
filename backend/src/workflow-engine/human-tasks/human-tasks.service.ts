import { Injectable } from '@nestjs/common';
import { HumanTask } from './entities';
import { HumanTaskRepository } from './human-tasks.repository';
import { BaseService } from '@common/base';

@Injectable()
export class HumanTaskService extends BaseService<HumanTask> {
  constructor(private humanTaskRepository: HumanTaskRepository) {
    super(humanTaskRepository, HumanTask);
  }
}
