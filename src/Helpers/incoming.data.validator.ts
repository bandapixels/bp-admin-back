const Joi = require('joi');

async function registrationLoginInputData(body) {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(30),

    email: Joi.string()
      .min(5)
      .max(30),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error(validatorParams.error.details[0].message);
  }
}

const valid = {
  registrationLoginInputData,
}

export default valid;
