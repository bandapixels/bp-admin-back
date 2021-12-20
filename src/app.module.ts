import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/auth/users.module';
import { UserController } from './modules/auth/user.controller';
import { UserService } from './modules/auth/user.service';
import { User } from './modules/auth/entity/User';
import { Tag } from './modules/tag/entity/admin.tag.entity';
import AdminTagModule from './modules/tag/admin.tag.module';
import AdminPostModule from './modules/post/admin.post.module';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { Post } from './modules/post/entity/admin.post.entity';
import { MailModule } from './modules/mail/mail.module';
import { AppConfigModule } from './modules/config/app.config.module';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './modules/config/models/db.config';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule, UsersModule, AdminPostModule, AdminTagModule],
      inject: [DbConfig],
      useFactory: async (dbConfig: DbConfig) => {
        const { database, password, username, port, host } = dbConfig;
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [User, Tag, Post],
          synchronize: true,
        };
      },
    }),
    AdminTagModule,
    AdminPostModule,

    MulterModule.register({
      dest: './uploads',
    }),
    MailModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
