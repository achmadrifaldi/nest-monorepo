import { DataSource } from 'typeorm';
import { PgConfig } from './postgres.config';
import * as path from 'path';

const entityPath = path.join(
  __dirname,
  '../../../../../../dist/libs/smart-digital-library/src/**/*.entity.{ts,js}',
);
const migrationPath = path.join(
  __dirname,
  '../../../../../../dist/libs/smart-digital-library/src/database/migrations/*.{ts,js}',
);

export const AppDataSource = new DataSource({
  ...PgConfig,
  type: 'postgres',
  entities: [entityPath],
  migrations: [migrationPath],
});
