import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';

import { AuditBaseEntity } from '../../shared/entities/audit-base.entity';
import { Role } from '../enums/role.enum';

@Expose()
@Entity({ name: 'users' })
export class User extends AuditBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    enum: Role,
    type: 'varchar',
    default: Role.DEFAULT,
  })
  role?: Role;
}
