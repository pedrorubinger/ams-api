import Joi from "joi"

const DeletePartnerValidator = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID_MUST_BE_TEXT",
    "any.required": "ID_IS_REQUIRED",
  }),
  tenantId: Joi.string().required().messages({
    "string.base": "TENANT_MUST_BE_TEXT",
    "any.required": "TENANT_IS_REQUIRED",
  }),
})

export { DeletePartnerValidator }
