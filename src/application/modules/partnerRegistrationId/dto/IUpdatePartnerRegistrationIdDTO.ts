import { UpdateTransactionInput } from "dynamoose/dist/Transaction"

import { AppError, Either } from "@shared/errors"

type IUpdatePartnerRegistrationIdOutput = { request: UpdateTransactionInput }

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
