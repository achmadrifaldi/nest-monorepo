import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app) => {
  /**
   * Swagger Config
   * https://docs.nestjs.com/openapi/introduction
   */
  const docConfig = new DocumentBuilder()
    .setTitle('App')
    .setDescription('List of API(s) for App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);
};
