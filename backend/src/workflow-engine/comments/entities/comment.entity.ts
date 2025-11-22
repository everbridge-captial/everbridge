import { BaseEntity } from '@common/database/base.entity';
import { Column, Entity } from 'typeorm';

export enum CommentVisibility {
  INTERNAL = 'internal',
  CROSS_ORG = 'cross_org',
}

@Entity('comments')
export class Comment extends BaseEntity {
  @Column()
  entityType: string;

  @Column()
  entityId: string;

  @Column({
    type: 'enum',
    enum: CommentVisibility,
    default: CommentVisibility.INTERNAL,
  })
  visibility: CommentVisibility;

  @Column('text')
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: object;
}
