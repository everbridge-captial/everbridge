import { BaseEntity } from '@common/database/base.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { HumanTask } from './human-task.entity';
import { User } from 'platform/users';
import { Organization, OrgType } from 'platform/organizations';

export enum HumanTaskAuthType {
  GROUP_ORG = 'group_org',
  GROUP_ORG_TYPE = 'group_org_type',
  USER = 'user',
}

@Entity('human_task_authorizations')
export class HumanTaskAuthorization extends BaseEntity {
  @OneToOne(() => HumanTask, (task) => task.authorization, {
    onDelete: 'CASCADE',
  })
  humanTask: HumanTask;

  @Column()
  humanTaskId: string;

  @Column({ type: 'enum', enum: HumanTaskAuthType })
  authType: HumanTaskAuthType;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: 'orgId' })
  organization?: Organization;

  @Column({ nullable: true })
  orgId?: string;

  @Column({ type: 'enum', enum: OrgType, nullable: true })
  orgType?: OrgType;

  @Column({ nullable: true })
  groupId?: string; // TODO: relation to a group entity?

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ nullable: true })
  userId?: string;

  @Column({ default: true })
  canClaim: boolean;

  @Column({ type: 'jsonb', nullable: true })
  canExecuteSignals?: string[];
}
