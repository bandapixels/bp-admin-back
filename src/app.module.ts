import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Tag } from './modules/tag/entity/admin.tag.entity';
import AdminTagModule from './modules/tag/admin.tag.module';
import PostModule from './modules/post/post.module';
import { Post } from './modules/post/entity/post.entity';
import { MailModule } from './modules/mail/mail.module';
import { AppConfigModule } from './modules/config/app.config.module';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './modules/config/models/db.config';
import { UserModule } from './modules/user/user.module';
import { HurmaModule } from './modules/hurma/hurma.module';
import { FilesModule } from './modules/files/files.module';
import { S3ManagerModule } from './modules/s3-manager/s3-manager.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { AwsConfig } from './modules/config/models/aws.config';
import { File } from './modules/files/entity/file.entity';

@Module({
  imports: [
    // CONFIG
    AppConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),

    // TYPEORM
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
          entities: [User, Tag, Post, File],
          synchronize: true,
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
    AdminTagModule,
    PostModule,
    UserModule,
    MailModule,
    HurmaModule,
    FilesModule,
    S3ManagerModule,
  ],
})
export class AppModule {}
