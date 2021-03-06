import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig } from './modules/config/models/app.config';
import { NestFactory } from '@nestjs/core';
import { TypeormExceptionFilter } from './common/filters/typeormException.filter';
import { json } from 'body-parser';
import * as path from 'path';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, '..', '/public'), {
    prefix: '/api/public',
  });

  app.use(
    json({
      limit: '50mb',
    }),
  );

  const appConfig = app.get(AppConfig);

  const options = new DocumentBuilder()
    .setTitle('Nest banda-admin api')
    .setDescription('Nest API description')
    .setVersion('1.0')
    .addTag('nest')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*', // TODO: replace with client url
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalFilters(new TypeormExceptionFilter());

  app.setGlobalPrefix('/api', {
    exclude: ['contact', 'contact/join'],
  });

  await app.listen(appConfig.port);
}

bootstrap();
