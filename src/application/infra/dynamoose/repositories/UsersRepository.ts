import * as dynamoose from "dynamoose"
import * as dynamoUtils from "@aws-sdk/util-dynamodb"
import { AttributeValue } from "@aws-sdk/client-dynamodb"
import {
  TransactionReturnOptions,
  TransactionSettings,
  CreateTransactionInput
} from "dynamoose/dist/Transaction"

import { IUsersRepository } from "@application/repositories/IUsersRepository"
import {
  ICreateUserDTO,
  ICreateUserOutput,
  ICreateUserResponseDTO
} from "@application/modules/user/dto/ICreateUserDTO"
import { UserModel } from "@domain/infra/dynamoose"
import { AppError } from "@shared/errors/AppError"
import { ErrorCodes } from "@shared/errors/ErrorCodes"
import { left, right } from "@shared/errors/Either"
import { TransactionType } from "@config/infra/dynamoose/TransactionType"

class UsersRepository implements IUsersRepository {
  async create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO> {
    try {
      const settings: TransactionSettings = {
        return: TransactionReturnOptions.items,
        type: "write" as unknown as TransactionType
      }

      let result: CreateTransactionInput

      await dynamoose.transaction(
        [
          (result = await UserModel.transaction.create(payload)),
          await UserModel.transaction.create({
            id: `email#${payload.email}`,
            tenantId: payload.tenantId
          })
        ],
        settings
      )

      const user = {
        ...dynamoUtils.unmarshall(
          result.Put.Item as Record<string, AttributeValue>
        )
      }

      delete user.password
      return right({ user: user as ICreateUserOutput })
    } catch (err) {
      console.log("[ERROR] UsersRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}

export { UsersRepository }
