import { join } from 'path';
import { DataSource, type DataSourceOptions } from 'typeorm';

const mysqlConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  timezone: 'UTC+0',
};

export const getOrmConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        ...mysqlConfig,
        synchronize: false,
        // migrations: ['src/migration/**/*.ts'],
        supportBigNumbers: true,
        entities: [join(__dirname, '..', 'services', '**', 'domain', 'model.{ts,js}')],
        bigNumberStrings: false,
      };
    case 'development':
      return {
        ...mysqlConfig,
        synchronize: true,
        // migrations: ['dist/src/migrations/*.js'],
        supportBigNumbers: true,
        entities: [join(__dirname, '..', 'services', '**', 'domain', 'model.{ts,js}')],
        bigNumberStrings: false,
        logging: true,
      };
    case 'test':
      return {
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        database: 'test',
        username: 'root',
        password: '1234',
        synchronize: false,
        migrations: ['src/migrations/*{.ts,.js}'],
        supportBigNumbers: true,
        entities: [join(__dirname, '..', 'services', '**', 'domain', 'model.{ts,js}')],
        bigNumberStrings: false,
      };
    default:
      return {
        ...mysqlConfig,
        synchronize: false,
        migrations: ['dist/src/migrations/*.js'],
        supportBigNumbers: true,
        entities: [join(__dirname, '..', 'services', '**', 'domain', 'model.{ts,js}')],
        bigNumberStrings: false,
      };
  }
};

const dataSourceForMigration = new DataSource(getOrmConfig() as DataSourceOptions);

export default dataSourceForMigration;
