import {MiddlewareConsumer, Module} from "@nestjs/common";
import {AppService} from "./Service/app.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "entity/User";
import {AppController} from "src/Api-Router/app.controller";
import {AuthMiddleware} from "src/middlewares/uthorization.middleware";

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

export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware, AuthMiddleware)
  //     .forRoutes(AppController)
  // }


}
