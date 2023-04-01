import Joi from "joi"

const UpdateTenantValidator = Joi.object({
  name: Joi.string().max(80).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_80",
  }),
  responsible: Joi.string().max(100).messages({
    "string.base": "RESPONSIBLE_MUST_BE_TEXT",
    "string.max": "RESPONSIBLE_EXCEEDS_LENGTH_100",
  }),
})

export { UpdateTenantValidator }
