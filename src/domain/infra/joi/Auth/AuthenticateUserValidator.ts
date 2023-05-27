import Joi from "joi"

const AuthenticateUserValidator = Joi.object({
  email: Joi.string().required().max(80).messages({
    "string.base": "EMAIL_MUST_BE_TEXT",
    "any.required": "EMAIL_IS_REQUIRED",
  }),
  password: Joi.string().required().max(100).messages({
    "any.required": "PASSWORD_IS_REQUIRED",
    "string.base": "PASSWORD_MUST_BE_TEXT",
  }),
})

export { AuthenticateUserValidator }
