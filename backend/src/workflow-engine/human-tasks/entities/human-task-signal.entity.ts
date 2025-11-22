import { BaseEntity } from '@common/database/base.entity';
import { User } from 'platform/users';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { HumanTask } from './human-task.entity';

@Entity('human_task_signals')
export class HumanTaskSignal extends BaseEntity {
  @ManyToOne(() => HumanTask, (task) => task.signals)
  @JoinColumn({ name: 'humanTaskId' })
  humanTask: HumanTask;

  @Column()
  humanTaskId: string;

  @Column()
  signal: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'performedById' })
  performedBy?: User;

  @Column({ nullable: true })
  performedById?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: object;
}
