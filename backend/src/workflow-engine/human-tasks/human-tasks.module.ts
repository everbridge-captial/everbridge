import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HumanTask } from './entities';
import { HumanTaskService } from './human-tasks.service';
import { HumanTaskRepository } from './human-tasks.repository';
import { HumanTasksController } from './human-tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HumanTask])],
  controllers: [HumanTasksController],
  providers: [HumanTaskService, HumanTaskRepository],
  exports: [HumanTaskService],
})
export class HumanTasksModule {}
