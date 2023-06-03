import { AppError, Either } from "@shared/errors"

type ICreatePartnerRegistrationIdOutput = { lastId: string }

interface ICreatePartnerRegistrationIdDTO {
  lastId: string
}

type ICreatePartnerRegistrationIdResponseDTO = Either<
  AppError,
  ICreatePartnerRegistrationIdOutput
>

export {
  ICreatePartnerRegistrationIdDTO,
  ICreatePartnerRegistrationIdResponseDTO,
  ICreatePartnerRegistrationIdOutput,
}
