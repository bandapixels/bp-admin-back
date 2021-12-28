import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { AuthConfig } from '../config/models/auth.config';
import { AppConfigService } from '../config/app.config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({}),
    AuthModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthConfig, AppConfigService],
  exports: [UsersService],
})
export class UsersModule {}
