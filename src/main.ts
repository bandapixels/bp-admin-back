import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AppConfig } from './modules/config/models/app.config';
import { ValidationPipe } from '@nestjs/common';
import { AuthConfig } from './modules/config/models/auth.config';

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
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const authConfig = app.get(AuthConfig);

  app.set('view engine', 'html');

  app.use(cookieParser());
  app.setBaseViewsDir(join(__dirname, '../', 'views'));

  app.useStaticAssets(join(__dirname, '../', 'public'), {
    prefix: '/public',
  });

  await app.listen(appConfig.port);
}

bootstrap();
