import Joi from "joi"

import { FindPartnerField } from "@application/modules/partner"

const FindPartnerValidator = Joi.object({
  field: Joi.string()
    .valid(...Object.values(FindPartnerField))
    .required()
    .max(100)
    .messages({
      "string.base": "FIELD_MUST_BE_TEXT",
      "any.required": "FIELD_IS_REQUIRED",
      "any.only": "FIELD_IS_NOT_ALLOWED",
    }),
  content: Joi.string().required().max(100).messages({
    "string.base": "CONTENT_MUST_BE_TEXT",
    "string.max": "CONTENT_EXCEEDS_LENGTH_100",
    "any.required": "CONTENT_IS_REQUIRED",
  }),
  tenantId: Joi.string().required().messages({
    "string.base": "TENANT_MUST_BE_TEXT",
    "any.required": "TENANT_IS_REQUIRED",
  }),
})

export { FindPartnerValidator }
