import { BaseEntity } from '@common/database/base.entity';
import { User } from '@platform/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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
