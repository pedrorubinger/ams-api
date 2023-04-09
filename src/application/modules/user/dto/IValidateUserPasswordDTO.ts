import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

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
