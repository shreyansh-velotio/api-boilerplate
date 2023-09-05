import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

import { configService } from './config.service';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export enum DB_CONNECTIONS {
  PG_LEADER = 'default', // System defaults to this if not specified.
  PG_FOLLOWER = 'pg_follower',
}

function getPgConfig() {
  return {
    host: configService.getValue('POSTGRES_HOST'),
    port: parseInt(configService.getValue('POSTGRES_PORT')),
    username: configService.getValue('POSTGRES_USER'),
    password: configService.getValue('POSTGRES_PASSWORD'),
    database: configService.getValue('POSTGRES_DATABASE'),
  };
}

// This configuration is for the follower and the leader
export const sharedPostgresConfig: Partial<PostgresConnectionOptions> = {
  ssl: false,
  synchronize: false,
  logging: ['error'],
  extra: {
    max: configService.getValue('POSTGRES_CONNECTION_POOL_SIZE'),
    query_timeout: 25000, // after 25 seconds type-orm will give query failed error
  },
  entities: [
    path.join(__dirname, '../modules/**/entities/*.entity{.ts,.js}'),
    path.join(__dirname, '../**/entities/*.entity{.ts,.js}'),
  ],
  namingStrategy: new SnakeNamingStrategy(),
};

const ormConfig: ConnectionOptions = {
  name: DB_CONNECTIONS.PG_LEADER,
  type: 'postgres',
  ...getPgConfig(),
  ...sharedPostgresConfig,
  migrationsTableName: 'migrations',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export default ormConfig;
