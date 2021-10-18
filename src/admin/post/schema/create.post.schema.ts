import * as Joi from 'joi';

export const CreatePostSchema = Joi.object({
  head: Joi.string().required().max(255),
  subtitle: Joi.string().max(255),
  excerpt: Joi.string().max(2048).required(),
  image: Joi.any().required(),
  preview_image: Joi.any().required(),
  tags: Joi.array().items(Joi.string()),
  mins_to_read: Joi.number().min(0).required(),
  body: Joi.string().max(4294967294).required(),
  // files: Joi.any(),
});
