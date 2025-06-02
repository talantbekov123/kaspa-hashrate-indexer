import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Hashrate } from './entity/Hashrate';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'kaspa_hashrate',
  synchronize: false,
  logging: true,
  entities: [Hashrate],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
});
