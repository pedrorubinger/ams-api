import { AppError, Either } from "@shared/errors"

type IUpsertPartnerRegistrationIdOutput = { lastId: string }

interface IUpsertPartnerRegistrationIdDTO {
  lastId?: string
}

type IUpsertPartnerRegistrationIdResponseDTO = Either<
  AppError,
  IUpsertPartnerRegistrationIdOutput
>

export {
  IUpsertPartnerRegistrationIdDTO,
  IUpsertPartnerRegistrationIdResponseDTO,
  IUpsertPartnerRegistrationIdOutput,
}
