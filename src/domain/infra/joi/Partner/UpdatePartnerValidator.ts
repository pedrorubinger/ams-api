import Joi from "joi"

const UpdatePartnerValidator = Joi.object({
  name: Joi.string().optional().max(100).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_100",
    "any.required": "NAME_IS_REQUIRED",
  }),
  registrationId: Joi.string().optional().messages({
    "string.base": "REGISTRATION_ID_MUST_BE_TEXT",
  }),
})

export { UpdatePartnerValidator }
