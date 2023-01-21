import { TenantModel } from "@domain/infra/dynamoose"
import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO
} from "@application/modules/tenant/dto/ICreateTenantDTO"
import {
  IGetAllTenantsParamsDTO,
  IGetAllTenantsResponseDTO
} from "@application/modules/tenant/dto/IGetAllTenantsResponseDTO"
import { left, right } from "@shared/errors/Either"
import { AppError } from "@shared/errors/AppError"
import { ErrorCodes } from "@shared/errors/ErrorCodes"

class TenantsRepository implements ITenantsRepository {
  async create(payload: ICreateTenantDTO): Promise<ICreateTenantResponseDTO> {
    try {
      const tenant = await TenantModel.create(payload)

      await tenant.save()

      return right({ tenant })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }

  async getAll(
    params?: IGetAllTenantsParamsDTO
  ): Promise<IGetAllTenantsResponseDTO> {
    try {
      const scan = TenantModel.scan().limit(params?.size ?? 5)

      if (params?.startAt) {
        scan.startAt({ id: params.startAt })
      }

      const tenants = await scan.exec()

      return right({
        tenants,
        lastKey: !tenants?.count
          ? null
          : ((tenants?.lastKey?.id ?? null) as string | null)
      })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > getAll", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}

export { TenantsRepository }
