enum ErrorCodes {
  /** 500 */
  INTERNAL = "500_INTERNAL_SERVER_ERROR",
  /** 401 */
  MISSING_TOKEN = "401_MISSING_TOKEN",
  INVALID_TOKEN = "401_INVALID_TOKEN",
  TOKEN_HAS_EXPIRED = "401_TOKEN_HAS_EXPIRED",
  NOT_AUTHORIZED = "401_NOT_AUTHORIZED",
  TENANT_IS_NOT_ACTIVE = "401_TENANT_IS_NOT_ACTIVE",
  USER_IS_NOT_ACTIVE = "401_USER_IS_NOT_ACTIVE",
  /** 404 */
  USER_NOT_FOUND = "404_USER_NOT_FOUND",
  TENANT_NOT_FOUND = "404_TENANT_NOT_FOUND",
  REGISTRATION_ID_NOT_FOUND = "404_REGISTRATION_ID_NOT_FOUND",
  /** 400 */
  TENANT_MUST_BE_TEXT = "400_TENANT_MUST_BE_TEXT",
  TENANT_IS_REQUIRED = "400_TENANT_IS_REQUIRED",
  EMAIL_ALREADY_REGISTERED = "400_EMAIL_ALREADY_REGISTERED",
  INVALID_CREDENTIALS = "400_INVALID_CREDENTIALS",
  NAME_MUST_BE_TEXT = "400_NAME_MUST_BE_TEXT",
  NAME_EXCEEDS_LENGTH_80 = "400_NAME_EXCEEDS_LENGTH_80",
  NAME_IS_REQUIRED = "400_NAME_IS_REQUIRED",
  RESPONSIBLE_IS_REQUIRED = "400_RESPONSIBLE_IS_REQUIRED",
  RESPONSIBLE_MUST_BE_TEXT = "400_RESPONSIBLE_MUST_BE_TEXT",
  RESPONSIBLE_EXCEEDS_LENGTH_100 = "400_RESPONSIBLE_EXCEEDS_LENGTH_100",
  NAME_EXCEEDS_LENGTH_100 = "400_NAME_EXCEEDS_LENGTH_100",
  EMAIL_MUST_BE_TEXT = "400_EMAIL_MUST_BE_TEXT",
  EMAIL_IS_INVALID = "400_EMAIL_IS_INVALID",
  EMAIL_IS_REQUIRED = "400_EMAIL_IS_REQUIRED",
  PASSWORD_MUST_BE_TEXT = "400_PASSWORD_MUST_BE_TEXT",
  PASSWORD_IS_REQUIRED = "400_PASSWORD_IS_REQUIRED",
  PASSWORD_IS_INVALID = "400_PASSWORD_IS_INVALID",
  NEW_PASSWORD_MUST_BE_TEXT = "400_NEW_PASSWORD_MUST_BE_TEXT",
  NEW_PASSWORD_IS_INVALID = "400_NEW_PASSWORD_IS_INVALID",
  NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_PASSWORD = "400_NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_PASSWORD",
  PHONE_MUST_BE_TEXT = "400_PHONE_MUST_BE_TEXT",
  PHONE_EXCEEDS_LENGTH_40 = "400_PHONE_EXCEEDS_LENGTH_40",
  ROLE_IS_REQUIRED = "400_ROLE_IS_REQUIRED",
  ROLE_MUST_BE_TEXT = "400_ROLE_MUST_BE_TEXT",
  ROLE_IS_INVALID = "400_ROLE_IS_INVALID",
  REGISTRATION_ID_MUST_BE_TEXT = "400_REGISTRATION_ID_MUST_BE_TEXT",
  REGISTRATION_ID_IS_REQUIRED = "400_REGISTRATION_ID_IS_REQUIRED",
  REGISTRATION_ID_MUST_BE_NUMERIC = "400_REGISTRATION_ID_MUST_BE_NUMERIC",
  ID_IS_REQUIRED = "400_ID_IS_REQUIRED",
  ID_MUST_BE_TEXT = "400_ID_MUST_BE_TEXT",
  FIELD_MUST_BE_TEXT = "400_FIELD_MUST_BE_TEXT",
  FIELD_IS_REQUIRED = "400_FIELD_IS_REQUIRED",
  FIELD_IS_NOT_ALLOWED = "400_FIELD_IS_NOT_ALLOWED",
  CONTENT_MUST_BE_TEXT = "400_CONTENT_MUST_BE_TEXT",
  CONTENT_EXCEEDS_LENGTH_100 = "CONTENT_EXCEEDS_LENGTH_100",
  CONTENT_IS_REQUIRED = "400_CONTENT_IS_REQUIRED",
  PARTNER_ID_MUST_BE_TEXT = "400_PARTNER_ID_MUST_BE_TEXT",
  PARTNER_ID_IS_REQUIRED = "400_PARTNER_ID_IS_REQUIRED",
  PARTNER_NOT_FOUND = "400_PARTNER_NOT_FOUND",
  DONATION_NOT_FOUND = "400_DONATION_NOT_FOUND",
  DONATION_VALUE_MUST_BE_NUMBER = "400_DONATION_VALUE_MUST_BE_NUMBER",
  DONATION_VALUE_IS_REQUIRED = "400_DONATION_VALUE_IS_REQUIRED",
  DONATION_CATEGORY_MUST_BE_TEXT = "400_DONATION_CATEGORY_MUST_BE_TEXT",
  DONATION_CATEGORY_IS_REQUIRED = "400_DONATION_CATEGORY_IS_REQUIRED",
  DONATION_CATEGORY_IS_NOT_ALLOWED = "400_DONATION_CATEGORY_IS_NOT_ALLOWED",
  BILLING_DATE_MUST_BE_AN_ARRAY = "400_BILLING_DATE_MUST_BE_AN_ARRAY",
  BILLING_DATE_REQUIRES_AT_LEAST_ONE_ELEMENT = "400_BILLING_DATE_REQUIRES_AT_LEAST_ONE_ELEMENT",
  BILLING_DATE_MUST_BE_TEXT = "400_BILLING_DATE_MUST_BE_TEXT",
  BILLING_DATE_IS_REQUIRED = "400_BILLING_DATE_IS_REQUIRED",
  DONATION_DESCRIPTION_MUST_BE_TEXT = "400_DONATION_DESCRIPTION_MUST_BE_TEXT",
  INITIAL_DATE_MUST_BE_TEXT = "400_INITIAL_DATE_MUST_BE_TEXT",
  INITIAL_DATE_MUST_BE_DATE = "400_INITIAL_DATE_MUST_BE_DATE",
  FINAL_DATE_MUST_BE_TEXT = "400_FINAL_DATE_MUST_BE_TEXT",
  FINAL_DATE_MUST_BE_DATE = "400_FINAL_DATE_MUST_BE_DATE",
  AUTO_REGISTRATION_MUST_BE_BOOLEAN = "400_AUTO_REGISTRATION_MUST_BE_BOOLEAN",
  DONATION_INCOME_DATE_MUST_BE_DATE = "400_DONATION_INCOME_DATE_MUST_BE_DATE",
  DONATION_INCOME_DATE_IS_REQUIRED = "400_DONATION_INCOME_DATE_IS_REQUIRED",
  REGISTRATION_ID_IS_ALREADY_REGISTERED = "400_REGISTRATION_ID_IS_ALREADY_REGISTERED",
}

export { ErrorCodes }
