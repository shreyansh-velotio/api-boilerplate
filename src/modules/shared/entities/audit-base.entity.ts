import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

export class AuditBaseEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
