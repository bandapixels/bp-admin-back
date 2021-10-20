import * as Joi from 'joi';

export const UpdatePostSchema = Joi.object({
  head: Joi.string().required().max(255),
  subtitle: Joi.string().max(255).allow('', null),
  excerpt: Joi.string().max(2048).required(),
  tags: Joi.array().items(Joi.string()),
  mins_to_read: Joi.number().min(0).required(),
  body: Joi.string().max(4294967294).required(),
});
