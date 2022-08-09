import helmet from 'helmet';
import * as compression from 'compression';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { WebApiModule } from './web-api.module';
import { ExistsRecordFilter, setupSwagger } from '@app/main';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WebApiModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('WEB_API_PORT');
  const host: string = config.get<string>('HOST');
  const env: string = config.get<string>('NODE_ENV');

  /**
   * Enable Helmet
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   * https://github.com/helmetjs/helmet#how-it-works
   */
  if (env === 'production') {
    app.use(helmet());
  }

  /**
   * Enable Compression
   * Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
   * https://docs.nestjs.com/techniques/compression
   */
  app.use(compression());

  /**
   * Enable Cors
   * https://docs.nestjs.com/security/cors
   */
  app.enableCors();

  /**
   * Set Global Prefix
   * https://docs.nestjs.com/faq/global-prefix
   */
  app.setGlobalPrefix('api');

  /**
   * https://stackoverflow.com/questions/48851140/how-to-handle-typeorm-entity-field-unique-validation-error-in-nestjs
   */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExistsRecordFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /**
   * Set Swagger
   */
  setupSwagger(app);

  await app.listen(port, host, () => {
    console.log(`[WEB SERVICE ${env}]`, `//${host}:${port}`);
  });
}
bootstrap();
