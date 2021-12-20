import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { AppConfig } from './modules/config/models/app.config';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthConfig } from './modules/config/models/auth.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfig = app.get(AppConfig);
  const authConfig = app.get(AuthConfig);

  app.set('view engine', 'html');
  app.use(cookieParser());
  app.use(
    session({
      secret: authConfig.sessionSecretKey,
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.useStaticAssets(join(__dirname, '../', 'public'), {
    prefix: '/public',
  });
  await app.listen(appConfig.port);
}

bootstrap();
