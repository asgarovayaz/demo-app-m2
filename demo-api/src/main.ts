import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as morgan from 'morgan';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

import { SharedModule } from '@shared/modules/shared.module';
import { SwaggerConfiguration } from './config/swagger.configuration';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
declare const module: any;
import * as cookieParser from 'cookie-parser';
import corsOrigins from '@api-common/cors/origins';
import { RootModule } from '@modules/root.module';
import { ApiConfigService } from '@shared/services/api-config.service';
import { UserService } from '@modules/users/user.service';

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create<NestExpressApplication>(
    RootModule,
    new ExpressAdapter(),
    {
      logger: ['error', 'warn'],
      cors: {
        credentials: true,
        origin: corsOrigins,
      },
    },
  );

  app.use(compression());

  app.use(morgan('combined'));

  app.use(cookieParser());

  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const apiConfigService = app.select(SharedModule).get(ApiConfigService);

  if (apiConfigService.documentationEnabled) {
    SwaggerConfiguration(app);
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const port = apiConfigService.appConfig.port;
  await app.listen(port);

  const userService = app.get(UserService);
  await userService.registerAdmin();

  console.info(`Server running on port ${port}`);

  return app;
}

bootstrap();
