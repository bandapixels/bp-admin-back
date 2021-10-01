import {Module} from "@nestjs/common";
import {AppService} from "./Service/app.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "entity/User";
import {AppController} from "src/Api-Router/app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'newuser',
      password: 'password',
      database: 'banda',
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
