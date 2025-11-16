import { BaseEntity } from '@common/database/base.entity';
import { User } from 'platform/users';
import { Column, Entity, OneToMany } from 'typeorm';

export enum OrgType {
  PLATFORM = 'PLATFORM',
  BUYER = 'BUYER',
  SME = 'SME',
  BANK = 'BANK',
}

export enum OnboardingStatus {
  INITITED = 'INITITED',
  COMPLETED = 'COMPLETED',
}

@Entity('organizations')
export class Organization extends BaseEntity {
  @Column() name: string;

  @Column({ enum: OrgType, default: OrgType.SME })
  type: OrgType;

  @Column({ enum: OnboardingStatus, default: OnboardingStatus.INITITED })
  onboardingStatus: OnboardingStatus;

  @OneToMany(() => User, (u) => u.organization)
  users: User[];
}
