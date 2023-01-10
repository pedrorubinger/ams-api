import Joi from "joi"

const CreateTenantValidator = Joi.object({
  name: Joi.string().required().max(80).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_80",
    "any.required": "NAME_IS_REQUIRED"
  }),
  responsible: Joi.string().required().max(100).messages({
    "any.required": "RESPONSIBLE_IS_REQUIRED",
    "string.base": "RESPONSIBLE_MUST_BE_TEXT",
    "string.max": "RESPONSIBLE_EXCEEDS_LENGTH_100"
  })
})

export { CreateTenantValidator }
