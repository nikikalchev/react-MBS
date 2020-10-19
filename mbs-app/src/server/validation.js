const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
  });
  return userSchema.validate(data);
};

const loginValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return userSchema.validate(data);
};

const matchValidation = (data) => {
  const matchSchema = Joi.object({
    team1: Joi.string().required(),
    team2: Joi.string().required(),
  });
  return matchSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.matchValidation = matchValidation;
