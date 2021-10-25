import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

dotenv.config({});
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  dotenv.config({});
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('view engine', 'html');
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET_KEY_SESSION,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  app.useStaticAssets(join(__dirname, '../..', 'public'), {
    prefix: '/public',
  });
  await app.listen(process.env.PORT);
}

bootstrap();
