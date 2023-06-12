import { CreateTransactionInput } from "dynamoose/dist/Transaction"

import { AppError, Either } from "@shared/errors"

type ICreatePartnerRegistrationIdOutput = { request: CreateTransactionInput }

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
