import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Connection } from '@temporalio/client';
import { Worker } from '@temporalio/worker';

export const TEMPORAL_CLIENT = 'TEMPORAL_CLIENT';

export const TemporalClientFactory: FactoryProvider<Client> = {
  provide: TEMPORAL_CLIENT,
  useFactory: async (config: ConfigService) => {
    const temporalHost = config.getOrThrow<string>('app.temporal.host');
    const connection = await Connection.connect({ address: temporalHost });

    return new Client({
      connection,
      namespace: config.get('server.env') ?? 'default',
    });
  },
  inject: [ConfigService],
};

export const WorkerFactory: FactoryProvider<Worker> = {
  provide: 'TEMPORAL_WORKER',
  useFactory: async (logger: Logger) => {
    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows/index.js'),
      activities: {},
      taskQueue: 'default-task-queue',
    });

    worker.run().catch((err) => logger.error(err));
    return worker;
  },
  inject: [Logger],
};
