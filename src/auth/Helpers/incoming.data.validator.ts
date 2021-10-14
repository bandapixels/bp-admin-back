import * as Joi from 'joi';
import { HttpException, HttpStatus } from '@nestjs/common';

async function loginInputData(body) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: validatorParams.error.details[0].message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

const valid = {
  loginInputData,
};

export default valid;
