import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { SharedModule } from '@shared/modules/shared.module';
import { ApiConfigService } from '@shared/services/api-config.service';

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
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class RootModule {}
