import * as joi from 'joi';

export const envValidationSchema = joi.object({
  // APP
  APP_PORT: joi.string().required(),
  APP_MODE: joi.string().required(),
  APP_PREFIX: joi.string().required(),

  // RABBIT
  RABBIT_HOST: joi.string().required(),
  RABBIT_PORT: joi.string().required(),
  RABBIT_PASSWORD: joi.string().required(),
  RABBIT_USERNAME: joi.string().required(),
});
