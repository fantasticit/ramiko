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

  @Column({ default: null, type: 'json' })
  setting: object; // 页面设置

  @Column({ default: null, type: 'json' })
  components: object; // 页面组件

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string; // 页面状态

  @Column({ type: 'int', default: 0 })
  views: number; // 访问量

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
