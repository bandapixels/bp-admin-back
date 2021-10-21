import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/auth/Controllers/user.controller';
import { UserService } from 'src/auth/Service/User/user.service';
import { User } from 'src/auth/entity/User';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { MailModule } from 'src/mail/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  providers: [UserService, RolesGuard],
  controllers: [UserController],
})
export class UsersModule {}
