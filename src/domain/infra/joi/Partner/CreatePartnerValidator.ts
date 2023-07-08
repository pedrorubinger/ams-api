import Joi from "joi"

const CreatePartnerValidator = Joi.object({
  name: Joi.string().required().max(100).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_100",
    "any.required": "NAME_IS_REQUIRED",
  }),
  tenantId: Joi.string().required().messages({
    "string.base": "TENANT_MUST_BE_TEXT",
    "any.required": "TENANT_IS_REQUIRED",
  }),
  registrationId: Joi.string().optional().regex(/^\d+$/).messages({
    "string.base": "REGISTRATION_ID_MUST_BE_TEXT",
    "string.pattern.base": "REGISTRATION_ID_MUST_BE_NUMERIC",
  }),
})

export { CreatePartnerValidator }
