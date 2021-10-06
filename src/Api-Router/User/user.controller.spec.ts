import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from 'src/Api-Router/User/user.controller';
import {UserService} from '../../Service/User/user.service';

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
