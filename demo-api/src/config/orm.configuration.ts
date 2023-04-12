import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
  {
    type: 'postgres',
    host: process.env.N_DB_HOST,
    port: Number(process.env.N_DB_PORT),
    username: process.env.N_DB_USERNAME,
    password: process.env.N_DB_PASSWORD,
    database: process.env.N_DB_DATABASE_MAIN,
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
  };

module.exports = configs;
