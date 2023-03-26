import Joi from "joi"

const UpdateUserValidator = Joi.object({
  name: Joi.string().max(100).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_100",
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.base": "PASSWORD_MUST_BE_TEXT",
      "any.required": "PASSWORD_IS_REQUIRED",
      "string.pattern": "PASSWORD_IS_INVALID",
    }),
  newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.base": "NEW_PASSWORD_MUST_BE_TEXT",
      "string.pattern": "NEW_PASSWORD_IS_INVALID",
    }),
  phone: Joi.string().optional().max(40).messages({
    "string.base": "PHONE_MUST_BE_TEXT",
    "string.max": "PHONE_EXCEEDS_LENGTH_40",
  }),
  role: Joi.string().valid("master", "admin").messages({
    "string.base": "ROLE_MUST_BE_TEXT",
    "string.valid": "ROLE_IS_INVALID",
  }),
})

export { UpdateUserValidator }
