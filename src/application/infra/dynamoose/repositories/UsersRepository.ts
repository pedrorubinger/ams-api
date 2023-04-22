import { hash } from "bcrypt"

import { TenantModel, UserModel, UserItem } from "@domain/infra/dynamoose"
import { IUsersRepository } from "@application/repositories"
import {
  ICreateUserDTO,
  ICreateUserOutput,
  ICreateUserResponseDTO,
  IFindUserResponseDTO,
  IFindUserByEmailResponseDTO,
  IGetAllUsersParamsDTO,
  IGetAllUsersResponseDTO,
  IUserWithTenantName,
  IUpdateAccountDTO,
  IUpdateAccountResponseDTO,
  IUpdateUserDTO,
  IUpdateUserResponseDTO,
  IDeleteUserResponseDTO,
} from "@application/modules/user"
import { left, right, AppError, ErrorCodes } from "@shared/errors"

class UsersRepository implements IUsersRepository {
  async create(payload: ICreateUserDTO): Promise<ICreateUserResponseDTO> {
    try {
      const user = await UserModel.create({
        ...payload,
        isActive: payload.isActive === undefined ? true : payload.isActive,
      })
      const createdUser = { ...user, password: undefined }

      createdUser.password = undefined
      delete createdUser.password
      return right({ user: createdUser as ICreateUserOutput })
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
      const { id, phone, name, tenantId, isActive } = payload
      const updatedData: Partial<UserItem> = {}

      if (tenantId !== undefined) updatedData.tenantId = tenantId
      if (isActive !== undefined) updatedData.isActive = !!isActive
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
        "isActive",
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
