import { AppError, Either } from "@shared/errors"

type IUpdatePartnerRegistrationIdOutput = { lastId: string }

interface IUpdatePartnerRegistrationIdDTO {
  id: string
  lastId: string
}

type IUpdatePartnerRegistrationIdResponseDTO = Either<
  AppError,
  IUpdatePartnerRegistrationIdOutput
>

export {
  IUpdatePartnerRegistrationIdDTO,
  IUpdatePartnerRegistrationIdResponseDTO,
  IUpdatePartnerRegistrationIdOutput,
}
