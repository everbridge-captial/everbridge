import { Controller, Inject } from '@nestjs/common';
import { BaseController } from '@common/base/base.controller';
import { HumanTask } from './entities';
import { HumanTaskService } from './human-tasks.service';

@Controller('human-tasks')
export class HumanTasksController extends BaseController<HumanTask> {
  constructor(
    @Inject(HumanTaskService)
    private readonly humanTaskService: HumanTaskService,
  ) {
    super(humanTaskService);
  }
}
