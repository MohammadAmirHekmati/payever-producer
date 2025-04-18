import * as joi from 'joi';

export const envValidationSchema = joi.object({
  // APP
  APP_PORT: joi.string().required(),
  APP_MODE: joi.string().required(),
  APP_PREFIX: joi.string().required(),

  // RABBIT
  RABBIT_URL: joi.string().required(),

  // MONGO
  MONGO_URL: joi.string().required(),
  MONGO_DATABASE: joi.string().required(),

});
