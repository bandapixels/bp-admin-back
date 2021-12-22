import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { AuthConfig } from '../config/models/auth.config';
import { AppConfigService } from '../config/app.config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    AuthModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthConfig, AppConfigService],
  exports: [UserService],
})
export class UserModule {}
