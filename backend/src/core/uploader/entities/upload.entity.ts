import { BaseEntity } from '@common/database/base.entity';
import { OnboardingApplication } from '@platform/onboarding/entities';
import { User } from '@platform/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('uploads')
export class Upload extends BaseEntity {
  @Column()
  filename: string;

  @Column({ unique: true })
  key: string;

  @Column()
  bucket: string;

  @Column()
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
}
