const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi
            .string()
            .required(),
    email: Joi
            .string()
            .required()
            .email(),
    password: Joi
            .string()
            .min(6)
            .required(),
    dateOfBirth: Joi
            .string()
            .min(10)
            .max(10)
            .required(),          
  });
  return schema.validate(data);
};

const updateValidation = (data) => {
        const schema = Joi.object({
          name: Joi
                  .string(),
          email: Joi
                  .string()
                  .email(),
          password: Joi
                  .string()
                  .min(6),
          dateOfBirth: Joi
                  .string()
                  .min(10)
                  .max(10),
        });
        return schema.validate(data);
      };

// LOGIN ROUTE (.../users/login) TO BE IMPLEMENTED
const loginValidation = (data) => {
  const schema = {
    email: Joi
            .string()
            .min(6)
            .required()
            .email(),
    password: Joi
            .string()
            .min(6)
            .required(),     
  };
  return Joi.validate(data, schema)
};

module.exports = {
  registerValidation,
  updateValidation,
  loginValidation,
}
