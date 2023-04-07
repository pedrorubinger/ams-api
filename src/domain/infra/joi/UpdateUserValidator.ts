import Joi from "joi"

const UpdateUserValidator = Joi.object({
  name: Joi.string().max(100).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_100",
  }),
  tenantId: Joi.string().optional().messages({
    "string.base": "TENANT_MUST_BE_TEXT",
    "any.required": "TENANT_IS_REQUIRED",
  }),
  phone: Joi.string().optional().max(40).messages({
    "string.base": "PHONE_MUST_BE_TEXT",
    "string.max": "PHONE_EXCEEDS_LENGTH_40",
  }),
})

export { UpdateUserValidator }
