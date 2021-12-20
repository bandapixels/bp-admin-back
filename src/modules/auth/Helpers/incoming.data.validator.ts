import * as Joi from 'joi';

export const CreateUserSchema = Joi.object({
  email: Joi.string().min(5).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
