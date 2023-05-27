import Joi, { ObjectSchema, StringSchema } from "joi"

import { DonationCategory } from "@domain/entities"

type GetAllDonationsValidatorSchema =
  ObjectSchema<GetAllDonationsValidatorProps>

interface GetAllDonationsValidatorProps {
  tenantId: StringSchema
  partnerId?: StringSchema
  category?: StringSchema
}

const GetAllDonationsValidator: GetAllDonationsValidatorSchema =
  Joi.object<GetAllDonationsValidatorProps>({
    partnerId: Joi.string().optional().messages({
      "string.base": "PARTNER_ID_MUST_BE_TEXT",
    }),
    category: Joi.string()
      .valid(...Object.values(DonationCategory))
      .optional()
      .messages({
        "string.base": "DONATION_CATEGORY_MUST_BE_TEXT",
        "any.only": "DONATION_CATEGORY_IS_NOT_ALLOWED",
      }),
    tenantId: Joi.string().required().messages({
      "string.base": "TENANT_MUST_BE_TEXT",
      "any.required": "TENANT_IS_REQUIRED",
    }),
  })

export { GetAllDonationsValidator }
