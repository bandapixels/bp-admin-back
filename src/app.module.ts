import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Tag } from './modules/tag/entity/admin.tag.entity';
import AdminTagModule from './modules/tag/admin.tag.module';
import PostModule from './modules/post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { Post } from './modules/post/entity/post.entity';
import { MailModule } from './modules/mail/mail.module';
import { AppConfigModule } from './modules/config/app.config.module';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './modules/config/models/db.config';
import { UserModule } from './modules/user/user.module';
import { HurmaModule } from './modules/hurma/hurma.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule, PostModule, AdminTagModule],
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
    PostModule,
    UserModule,
    MulterModule.register({
      dest: './uploads',
    }),
    MailModule,
    HurmaModule,
  ],
})
export class AppModule {}
