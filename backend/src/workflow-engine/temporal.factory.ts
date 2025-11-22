import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Connection } from '@temporalio/client';

import {
  bundleWorkflowCode,
  NativeConnection,
  Worker,
} from '@temporalio/worker';
import { join } from 'path';

export const TEMPORAL_CLIENT = 'TEMPORAL_CLIENT';

export const TemporalClientFactory: FactoryProvider<Client> = {
  provide: TEMPORAL_CLIENT,
  useFactory: async (config: ConfigService) => {
    try {
      const temporalHost = config.get('app.temporal.host');
      const connection = await Connection.connect({
        address: temporalHost,
      });

      return new Client({
        namespace: config.get('server.env') ?? 'default',
        connection,
      });
    } catch (error) {
      console.error('Failed to create Temporal client:', error);
      throw error;
    }
  },
  inject: [ConfigService],
};

export const TEMPORAL_WORKER = 'TEMPORAL_WORKER';

export const ACTIVITIES = 'ACTIVITIES';

export const TemporalWorkerFactory: FactoryProvider<Worker> = {
  provide: TEMPORAL_WORKER,
  useFactory: async (
    config: ConfigService,
    activities: Record<string, any>,
  ) => {
    const logger = new Logger('TemporalWorker');

    try {
      logger.debug('Starting Temporal Worker');
      const temporalHost = config.get('app.temporal.host');

      const connection = await NativeConnection.connect({
        address: temporalHost,
      });

      const workflowBundle = await bundleWorkflowCode({
        workflowsPath: join(__dirname, 'workflows'),
      });

      const worker = await Worker.create({
        workflowBundle,
        activities,
        taskQueue: 'default',
        connection,
        namespace: config.get('app.temporal.namespace') ?? 'default',
      });

      logger.debug('Temporal worker created successfully');

      return worker;
    } catch (err) {
      logger.error('Failed to create Temporal worker:', err);
      throw err;
    }
  },
  inject: [ConfigService, ACTIVITIES],
};
