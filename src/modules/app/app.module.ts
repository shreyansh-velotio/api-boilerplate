import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from '../../config/orm.config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
