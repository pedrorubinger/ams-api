import Joi from "joi"

const UpdateAccountValidator = Joi.object({
  name: Joi.string().max(100).messages({
    "string.base": "NAME_MUST_BE_TEXT",
    "string.max": "NAME_EXCEEDS_LENGTH_100",
  }),
  password: Joi.string().required().messages({
    "string.base": "PASSWORD_MUST_BE_TEXT",
    "any.required": "PASSWORD_IS_REQUIRED",
    "string.pattern": "PASSWORD_IS_INVALID",
  }),
  newPassword: Joi.string()
    .when(Joi.ref("password"), {
      is: Joi.exist(),
      then: Joi.not(Joi.ref("password")),
      otherwise: Joi.optional(),
    })
    .messages({
      "string.base": "NEW_PASSWORD_MUST_BE_TEXT",
      "string.pattern": "NEW_PASSWORD_IS_INVALID",
      "any.invalid": "NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_PASSWORD",
    }),
  phone: Joi.string().optional().max(40).messages({
    "string.base": "PHONE_MUST_BE_TEXT",
    "string.max": "PHONE_EXCEEDS_LENGTH_40",
  }),
})

export { UpdateAccountValidator }
