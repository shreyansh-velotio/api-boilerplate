require('dotenv').config();
import { Injectable } from '@nestjs/common';

import { BaseConfigService } from './base.config';

@Injectable()
export class ConfigService extends BaseConfigService {}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_DATABASE',
  'POSTGRES_HOST',
  'POSTGRES_PASSWORD',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_CONNECTION_POOL_SIZE',
]);

export { configService };
