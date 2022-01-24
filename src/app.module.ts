import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/entity/users.entity';
import { Tags } from './modules/tags/entity/admin.tags.entity';
import AdminTagsModule from './modules/tags/admin.tags.module';
import PostsModule from './modules/posts/posts.module';
import { Posts } from './modules/posts/entity/posts.entity';
import { MailModule } from './modules/mail/mail.module';
import { AppConfigModule } from './modules/config/app.config.module';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './modules/config/models/db.config';
import { UsersModule } from './modules/users/users.module';
import { HurmaModule } from './modules/hurma/hurma.module';
import { FilesModule } from './modules/files/files.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { AwsConfig } from './modules/config/models/aws.config';
import { Files } from './modules/files/entity/files.entity';
import { ContactUsModule } from './modules/contact-us/contact-us.module';

@Module({
  imports: [
    // CONFIG
    AppConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),

    // TYPEORM
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule, PostsModule, AdminTagsModule],
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
          entities: [Users, Tags, Posts, Files],
          synchronize: false,
          logging: true,
        };
      },
    }),

    // AWS
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [AppConfigModule],
        inject: [AwsConfig],
        useFactory: (awsConfig: AwsConfig) => {
          return {
            region: awsConfig.s3Region,
            credentials: {
              accessKeyId: awsConfig.accessKey,
              secretAccessKey: awsConfig.secretKey,
            },
          };
        },
      },
      services: [S3],
    }),

    // MODULES
    AdminTagsModule,
    PostsModule,
    UsersModule,
    MailModule,
    HurmaModule,
    FilesModule,
    ContactUsModule,
  ],
})
export class AppModule {}
