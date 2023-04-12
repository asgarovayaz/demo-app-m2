import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'dev';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'prod';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' environment variable is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get dbSyncEnabled(): boolean {
    return this.getBoolean('N_DB_DATABASE_SYNC');
  }

  get appConfig() {
    return {
      port: this.getString('N_APP_PORT'),
    };
  }

  get authConfig(): JwtSignOptions {
    return {
      secret: this.getString('N_JWT_SECRET_KEY'),
      expiresIn: this.getNumber('N_JWT_EXPIRATION_TIME'),
    };
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: !this.isTest,
      dropSchema: this.isTest,
      type: 'postgres',
      host: this.getString('N_DB_HOST'),
      port: this.getNumber('N_DB_PORT'),
      username: this.getString('N_DB_USERNAME'),
      password: this.getString('N_DB_PASSWORD'),
      database: this.getString('N_DB_DATABASE_MAIN'),
      migrationsRun: true,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      synchronize: this.dbSyncEnabled,
      entityPrefix: this.getString('N_DB_TABLE_PREFIX'),
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (value === null || value === undefined) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
