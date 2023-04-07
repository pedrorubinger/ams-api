enum ErrorCodes {
  /** 500 */
  INTERNAL = "500_INTERNAL_SERVER_ERROR",
  /** 401 */
  MISSING_TOKEN = "401_MISSING_TOKEN",
  INVALID_TOKEN = "401_INVALID_TOKEN",
  TOKEN_HAS_EXPIRED = "401_TOKEN_HAS_EXPIRED",
  NOT_AUTHORIZED = "401_NOT_AUTHORIZED",
  TENANT_IS_NOT_ACTIVE = "401_TENANT_IS_NOT_ACTIVE",
  /** 404 */
  USER_NOT_FOUND = "404_USER_NOT_FOUND",
  TENANT_NOT_FOUND = "404_TENANT_NOT_FOUND",
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
}

export { ErrorCodes }
