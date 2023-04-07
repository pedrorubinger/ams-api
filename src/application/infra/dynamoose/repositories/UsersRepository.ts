import * as dynamoose from "dynamoose"
import * as dynamoUtils from "@aws-sdk/util-dynamodb"
import { AttributeValue } from "@aws-sdk/client-dynamodb"
import {
  TransactionReturnOptions,
  TransactionSettings,
  CreateTransactionInput,
} from "dynamoose/dist/Transaction"
import { hash } from "bcrypt"

import { IUsersRepository } from "@application/repositories/IUsersRepository"
import {
  ICreateUserDTO,
  ICreateUserOutput,
  ICreateUserResponseDTO,
} from "@application/modules/user/dto/ICreateUserDTO"
import { TenantModel, UserModel } from "@domain/infra/dynamoose"
import { UserItem } from "@domain/infra/dynamoose/User"
import { AppError } from "@shared/errors/AppError"
import { ErrorCodes } from "@shared/errors/ErrorCodes"
import { left, right } from "@shared/errors/Either"
import { TransactionType } from "@config/infra/dynamoose/TransactionType"
import { IFindUserResponseDTO } from "@application/modules/user/dto/IFindUserDTO"
import { IFindUserByEmailResponseDTO } from "@application/modules/user/dto/IFindUserByEmailDTO"
import {
  IGetAllUsersParamsDTO,
  IGetAllUsersResponseDTO,
  IUserWithTenantName,
} from "@application/modules/user/dto/IGetAllUsersReponseDTO"
import {
  IUpdateAccountDTO,
  IUpdateAccountResponseDTO,
} from "@application/modules/user/dto/IUpdateAccountDTO"
import {
  IUpdateUserDTO,
  IUpdateUserResponseDTO,
} from "@application/modules/user/dto/IUpdateUserDTO"
import { IDeleteUserResponseDTO } from "@application/modules/user/dto/IDeleteUserResponseDTO"

class UsersRepository implements IUsersRepository {
  async create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO> {
    try {
      const settings: TransactionSettings = {
        return: TransactionReturnOptions.items,
        type: "write" as unknown as TransactionType,
      }

      let result: CreateTransactionInput

      await dynamoose.transaction(
        [(result = await UserModel.transaction.create(payload))],
        settings
      )

      const user = {
        ...dynamoUtils.unmarshall(
          result.Put.Item as Record<string, AttributeValue>
        ),
      }

      delete user.password
      return right({ user: user as ICreateUserOutput })
    } catch (err) {
      console.log("[ERROR] UsersRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async updateAccount(
    payload: Omit<IUpdateAccountDTO, "role" | "password">
  ): Promise<IUpdateAccountResponseDTO> {
    try {
      const { id, newPassword, phone, name } = payload
      const updatedData: Partial<UserItem> = {}

      if (newPassword !== undefined) {
        const hashedPassword = await hash(newPassword, 8)

        updatedData.password = hashedPassword
      }
      if (phone !== undefined) updatedData.phone = phone
      if (name !== undefined) updatedData.name = name

      const user = await UserModel.update({ id }, updatedData)

      return right({ user })
    } catch (err) {
      console.log("[ERROR] UsersRepository > updateAccount", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async update(
    payload: Omit<IUpdateUserDTO, "role" | "password">
  ): Promise<IUpdateUserResponseDTO> {
    try {
      const { id, phone, name, tenantId } = payload
      const updatedData: Partial<UserItem> = {}

      if (tenantId !== undefined) updatedData.tenantId = tenantId
      if (phone !== undefined) updatedData.phone = phone
      if (name !== undefined) updatedData.name = name

      const user = await UserModel.update({ id }, updatedData)

      return right({ user })
    } catch (err) {
      console.log("[ERROR] UsersRepository > update", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async find(id: string): Promise<IFindUserResponseDTO> {
    try {
      const response = await UserModel.query("id").eq(id).exec()

      if (!response?.length) {
        return left(new AppError(ErrorCodes.USER_NOT_FOUND, 404))
      }

      const user = { ...response[0] }

      return right({ user })
    } catch (err) {
      console.log("[ERROR] UsersRepository > find", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async findByEmail(email: string): Promise<IFindUserByEmailResponseDTO> {
    try {
      const response = await UserModel.scan({ email: { contains: email } })
        .all()
        .exec()

      return right({ user: response[0] })
    } catch (err) {
      console.log("[ERROR] UsersRepository > findByEmail", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async getAll(
    params?: IGetAllUsersParamsDTO
  ): Promise<IGetAllUsersResponseDTO> {
    try {
      const haveFilters = !!params?.email
      const scan = UserModel.scan().attributes([
        "id",
        "tenantId",
        "email",
        "name",
        "role",
        "phone",
        "createdAt",
        "updatedAt",
      ])

      if (params?.startAt) scan.startAt({ id: params.startAt })
      if (params?.email) scan.where("email").eq(params.email)
      if (!haveFilters) scan.limit(params?.size ?? 5)

      const total = await UserModel.scan().count().exec()
      const users = await scan.exec()

      // Gets the tenant name for each user
      const promises = users.map(async (user) => {
        const tenant = await TenantModel.get(user.tenantId)

        return {
          ...user,
          tenantName: tenant?.name || user?.tenantId,
        }
      })

      const result = await Promise.all(promises)

      return right({
        users: result as IUserWithTenantName[],
        total: total.count,
        lastKey: !users?.count
          ? null
          : ((users?.lastKey?.id ?? null) as string | null),
      })
    } catch (err) {
      console.log("[ERROR] UsersRepository > getAll", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async delete(id: string): Promise<IDeleteUserResponseDTO> {
    try {
      const user = await UserModel.get(id)

      if (!user) return left(new AppError(ErrorCodes.TENANT_NOT_FOUND))

      await UserModel.delete({ id })
      return right({ success: true })
    } catch (err) {
      console.log("[ERROR] UsersRepository > delete", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}

export { UsersRepository }
