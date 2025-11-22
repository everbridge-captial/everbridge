import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from '@temporalio/client';
import { Worker } from '@temporalio/worker';
import { v4 } from 'uuid';

import { TEMPORAL_CLIENT, TEMPORAL_WORKER } from './temporal.factory';

@Injectable()
export class TemporalService implements OnModuleInit {
  private readonly logger = new Logger(TemporalService.name);

  constructor(
    @Inject(TEMPORAL_CLIENT) private readonly temporalClient: Client,
    @Inject(TEMPORAL_WORKER) private readonly temporalWorker: Worker,
  ) {}

  async onModuleInit() {
    this.logger.log('Starting Temporal worker...');
    this.temporalWorker.run().catch((err) => {
      this.logger.error('Temporal worker failed', err);
    });
    this.logger.log('Temporal worker started successfully.');
  }

  async start({
    event,
    payload,
    queue = 'default',
    eventId,
  }: {
    payload: any;
    event: string;
    queue?: string;
    eventId: string;
  }) {
    await this.temporalClient.workflow.start(event, {
      args: [payload],
      taskQueue: queue,
      workflowId: eventId ?? v4(),
    });
  }
}
