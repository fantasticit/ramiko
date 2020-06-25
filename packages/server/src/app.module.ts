import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 页面模块
import { PageModule } from './modules/page/page.module';
import { Page } from './modules/page/page.entity';
import { config } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...config.mysql,
      entities: [Page],
      synchronize: true
    }),
    PageModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
