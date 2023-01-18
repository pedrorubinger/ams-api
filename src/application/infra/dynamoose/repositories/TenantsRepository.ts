import { TenantModel } from "@domain/infra/dynamoose"
import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO
} from "@application/modules/tenant/dto/ICreateTenantDTO"
import { IGetAllTenantsResponseDTO } from "@application/modules/tenant/dto/IGetAllTenantsResponseDTO"
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

  async getAll(): Promise<IGetAllTenantsResponseDTO> {
    try {
      const tenants = await TenantModel.scan().exec()

      return right({ tenants })
    } catch (err) {
      console.log("[ERROR] TenantsRepository > getAll", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}

export { TenantsRepository }
