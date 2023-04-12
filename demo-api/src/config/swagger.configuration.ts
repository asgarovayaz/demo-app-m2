import {
  JWT_COOKIE_NAME,
  SUPPORT_COMPANY_EMAIL,
  SUPPORT_COMPANY_NAME,
  SUPPORT_COMPANY_SITE,
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_NAME,
  SWAGGER_API_ROOT,
} from '@api-common/constants/app.constant';
import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfiguration(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .setContact(
      SUPPORT_COMPANY_NAME,
      SUPPORT_COMPANY_SITE,
      SUPPORT_COMPANY_EMAIL,
    )
    .addCookieAuth(JWT_COOKIE_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      customSiteTitle: SWAGGER_API_DESCRIPTION,
    },
  });

  console.info(
    `Documentation: http://localhost:${process.env.N_APP_PORT}/${SWAGGER_API_ROOT}`,
  );
}
