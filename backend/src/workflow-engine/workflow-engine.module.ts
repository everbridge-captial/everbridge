import { Module, Logger } from '@nestjs/common';
import { HumanTasksModule } from './human-tasks';
import { CommentsModule } from './comments';
import { activities } from './activities';
import {
  ACTIVITIES,
  TEMPORAL_CLIENT,
  TemporalClientFactory,
  TemporalWorkerFactory,
} from './temporal.factory';
import { TemporalService } from './temporal.service';

@Module({
  providers: [
    TemporalClientFactory,
    TemporalWorkerFactory,
    Logger,
    TemporalService,
    {
      provide: ACTIVITIES,
      useValue: activities,
    },
  ],
  exports: [TemporalService, TEMPORAL_CLIENT],
  imports: [HumanTasksModule, CommentsModule],
})
export class WorkflowEngineModule {}
