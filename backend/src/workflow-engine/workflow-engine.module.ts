import { Module, Logger } from '@nestjs/common';
import { HumanTasksModule } from './human-tasks';
import { CommentsModule } from './comments';
import {
  TEMPORAL_CLIENT,
  TemporalClientFactory,
  WorkerFactory,
} from './temporal.factory';

@Module({
  providers: [TemporalClientFactory, WorkerFactory, Logger],
  exports: [TEMPORAL_CLIENT],
  imports: [HumanTasksModule, CommentsModule],
})
export class WorkflowEngineModule {}
