import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from "src/auth/Controllers/user.controller";
import {UserService} from "src/auth/Service/User/user.service";

describe('AppController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

});
