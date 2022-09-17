import joi from 'joi';

const schemaCart = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(25).required(),
  password_confirmation: joi.any().valid(joi.ref('password')).required()
});
const schemaCheckout = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(25).required(),
  password_confirmation: joi.any().valid(joi.ref('password')).required()
});

export {schemaCadrasto};