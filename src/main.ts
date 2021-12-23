import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig } from './modules/config/models/app.config';
import { NestFactory } from '@nestjs/core';
import { TypeormExceptionFilter } from './common/filters/typeormException.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalFilters(new TypeormExceptionFilter());

  app.setGlobalPrefix('/api');

  await app.listen(appConfig.port);
}

bootstrap();
