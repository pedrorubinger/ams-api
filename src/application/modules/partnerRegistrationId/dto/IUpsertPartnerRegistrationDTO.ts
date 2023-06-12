import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "dynamoose/dist/Transaction"

import { AppError, Either } from "@shared/errors"

type IUpsertPartnerRegistrationIdOutput = {
  lastId: string
  request: UpdateTransactionInput | CreateTransactionInput
}

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
