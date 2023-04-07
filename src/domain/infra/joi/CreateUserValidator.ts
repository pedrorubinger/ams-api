import Joi from "joi"

const CreateUserValidator = Joi.object({
  name: Joi.string().required().max(100).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_100",
    "any.required": "NAME_IS_REQUIRED",
  }),
  tenantId: Joi.string().required().messages({
    "string.base": "TENANT_MUST_BE_TEXT",
    "any.required": "TENANT_IS_REQUIRED",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "EMAIL_MUST_BE_TEXT",
    "string.email": "EMAIL_IS_INVALID",
    "any.required": "EMAIL_IS_REQUIRED",
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.base": "PASSWORD_MUST_BE_TEXT",
      "any.required": "PASSWORD_IS_REQUIRED",
      "string.pattern": "PASSWORD_IS_INVALID",
    }),
  phone: Joi.string().optional().max(40).messages({
    "string.base": "PHONE_MUST_BE_TEXT",
    "string.max": "PHONE_EXCEEDS_LENGTH_40",
  }),
  role: Joi.string().required().valid("master", "admin").messages({
    "any.required": "ROLE_IS_REQUIRED",
    "string.base": "ROLE_MUST_BE_TEXT",
    "string.valid": "ROLE_IS_INVALID",
  }),
})

export { CreateUserValidator }
