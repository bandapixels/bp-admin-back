import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/User';
import { RolesGuard } from './guards/roles.guard';
import { MailModule } from '../mail/mail.module';
import { AppConfigModule } from '../config/app.config.module';

@Module({
  imports: [
    AppConfigModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  providers: [UserService, RolesGuard],
  controllers: [UserController],
})
export class UsersModule {}
