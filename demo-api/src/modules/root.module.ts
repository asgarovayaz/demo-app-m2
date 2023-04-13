import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { SharedModule } from '@shared/modules/shared.module';
import { ApiConfigService } from '@shared/services/api-config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CategoryModule } from './categories/category.module';
import { PostModule } from './posts/post.module';
import { HealthCheckModule } from './health/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./environment/.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (apiConfigService: ApiConfigService) =>
        apiConfigService.typeOrmConfig,
      inject: [ApiConfigService],
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    PostModule,
    HealthCheckModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class RootModule {}
