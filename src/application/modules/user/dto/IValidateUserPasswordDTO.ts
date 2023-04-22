import { AppError, Either } from "@shared/errors"

type IValidateUserPasswordOutput = boolean

interface IValidateUserPasswordDTO {
  id: string
  password: string
  // tenantId: string
}

type IValidateUserPasswordResponseDTO = Either<
  AppError,
  { isValid: IValidateUserPasswordOutput }
>

export {
  IValidateUserPasswordDTO,
  IValidateUserPasswordResponseDTO,
  IValidateUserPasswordOutput,
}
