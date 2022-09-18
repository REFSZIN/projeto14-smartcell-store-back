import joi from 'joi';

const schemaCart = joi.object({
  product: joi.object().required(),
  email: joi.string().email().required(),
});

const schemaCheckout = joi.object({
  email: joi.string().email().required(),
  cep: joi.string().email().required(),
  number: joi.number().required(),
  state: joi.string().required(),
  district: joi.string().required(),
  city: joi.string().required(),
  payMethod: joi.string().required(),
  request: joi.object().required(),
});

export {schemaCheckout,schemaCart};