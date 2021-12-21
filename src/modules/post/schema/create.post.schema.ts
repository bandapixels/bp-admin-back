import * as Joi from 'joi';

export const CreatePostSchema = Joi.object({
  head: Joi.string().required().max(255),
  subtitle: Joi.string().max(255),
  excerpt: Joi.string().max(2048).required(),
  tags: Joi.array().items(Joi.string()),
  mins_to_read: Joi.number().min(0).required(),
  body: Joi.string().max(Number(process.env.MAX_LENGHT_BODY_POST)).required(),
});