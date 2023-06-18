import Joi from "joi"

const GetAllPartnersValidator = Joi.object({
  tenantId: Joi.string().required().messages({
    "string.base": "TENANT_MUST_BE_TEXT",
    "any.required": "TENANT_IS_REQUIRED",
  }),
})

export { GetAllPartnersValidator }
