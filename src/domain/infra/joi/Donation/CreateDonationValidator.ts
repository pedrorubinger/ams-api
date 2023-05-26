import { DonationCategory } from "@domain/entities"
import Joi from "joi"

const CreateDonationValidator = Joi.object({
  partnerId: Joi.string().required().messages({
    "string.base": "PARTNER_ID_MUST_BE_NUMBER",
    "any.required": "PARTNER_ID_IS_REQUIRED",
  }),
  value: Joi.number().required().messages({
    "number.base": "DONATION_VALUE_MUST_BE_NUMBER",
    "any.required": "DONATION_VALUE_IS_REQUIRED",
  }),
  category: Joi.string()
    .valid(...Object.values(DonationCategory))
    .required()
    .messages({
      "string.base": "DONATION_CATEGORY_MUST_BE_TEXT",
      "any.required": "DONATION_CATEGORY_IS_REQUIRED",
      "any.only": "DONATION_CATEGORY_IS_NOT_ALLOWED",
    }),
  billingDate: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.base": "BILLING_DATE_MUST_BE_AN_ARRAY",
      "array.min": "BILLING_DATE_REQUIRES_AT_LEAST_ONE_ELEMENT",
      "string.base": "BILLING_DATE_MUST_BE_TEXT",
      "any.required": "BILLING_DATE_IS_REQUIRED",
    }),
  tenantId: Joi.string().required().messages({
    "string.base": "TENANT_MUST_BE_TEXT",
    "any.required": "TENANT_IS_REQUIRED",
  }),
  description: Joi.string().optional().messages({
    "string.base": "DONATION_DESCRIPTION_MUST_BE_TEXT",
  }),
})

export { CreateDonationValidator }
