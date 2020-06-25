import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  cover: string; // 页面封面

  @Column()
  name: string; // 页面名

  @Column({ default: null, type: 'json' })
  content: object; // 页面封面

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string; // 页面状态

  @Column({ type: 'int', default: 0 })
  views: number; // 阅读量

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishAt: Date; // 发布日期

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at'
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at'
  })
  updateAt: Date;
}
