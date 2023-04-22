import * as dynamoose from "dynamoose"
import {
  TransactionReturnOptions,
  TransactionSettings,
} from "dynamoose/dist/Transaction"

import { TransactionType } from "@config/infra/dynamoose"
import { TenantItem } from "@domain/infra/dynamoose"
import { TenantModel, UserModel } from "@domain/infra/dynamoose"
import { ITenantsRepository } from "@application/repositories"
import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO,
  IGetAllTenantsParamsDTO,
  IGetAllTenantsResponseDTO,
  IUpdateTenantDTO,
  IUpdateTenantResponseDTO,
  IDeleteTenantResponseDTO,
  IFindTenantResponseDTO,
} from "@application/modules/tenant"
import { left, right, AppError, ErrorCodes } from "@shared/errors"

class TenantsRepository implements ITenantsRepository {
  async create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO> {
    try {
      const tenant = await TenantModel.create({
        ...payload,
        isActive: payload.isActive === undefined ? true : payload.isActive,
      })

      await tenant.save()

      return right({ tenant })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async update(payload: IUpdateTenantDTO): Promise<IUpdateTenantResponseDTO> {
    try {
      const { id } = payload
      const data: Partial<TenantItem> = {}

      if (payload.isActive !== undefined) data.isActive = !!payload.isActive
      if (payload.name) data.name = payload.name
      if (payload.responsible) data.responsible = payload.responsible

      const tenant = await TenantModel.update({ id }, data)

      await tenant.save()
      return right({ tenant })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > update", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async find(id: string): Promise<IFindTenantResponseDTO> {
    try {
      const response = await TenantModel.query("id").eq(id).exec()

      if (!response?.length) {
        return left(new AppError(ErrorCodes.TENANT_NOT_FOUND, 404))
      }

      const tenant = { ...response[0] }

      return right({ tenant: tenant as TenantItem })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > update", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async getAll(
    params?: IGetAllTenantsParamsDTO
  ): Promise<IGetAllTenantsResponseDTO> {
    try {
      const scan = TenantModel.scan()
      const limit =
        params?.size === "all" ? undefined : Number(params?.size || 5)

      if (params?.startAt) scan.startAt({ id: params.startAt })
      if (limit) scan.limit(limit)

      const total = await TenantModel.scan().count().exec()
      const tenants = await scan.exec()

      return right({
        tenants,
        total: total.count,
        lastKey: !tenants?.count
          ? null
          : ((tenants?.lastKey?.id ?? null) as string | null),
      })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > getAll", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async delete(id: string): Promise<IDeleteTenantResponseDTO> {
    try {
      const tenant = await TenantModel.get(id)

      if (!tenant) {
        return left(new AppError(ErrorCodes.TENANT_NOT_FOUND))
      }

      const users = await UserModel.scan("tenantId").eq(id).exec()

      const settings: TransactionSettings = {
        return: TransactionReturnOptions.items,
        type: "write" as unknown as TransactionType,
      }

      if (users.length) {
        const userRequests = users.map((user) =>
          UserModel.transaction.delete({ id: user.id })
        )
        const tenantRequest = TenantModel.transaction.delete({ id })

        await dynamoose.transaction([...userRequests, tenantRequest], settings)
      } else {
        await TenantModel.delete({ id })
      }

      return right({ success: true })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > delete", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}

export { TenantsRepository }
