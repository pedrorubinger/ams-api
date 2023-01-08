import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import { ICreateTenantDTO } from "@application/modules/tenant/dto/ICreateTenantDTO"
import { TenantModel } from "@domain/infra/dynamoose"
import { ITenant } from "@domain/entities/Tenant"

class TenantsRepository implements ITenantsRepository {
  async create(payload: ICreateTenantDTO): Promise<ITenant> {
    try {
      const tenant = await TenantModel.create(payload)

      await tenant.save()

      return tenant
    } catch (err) {
      console.log("[ERROR] TenantsRepository > create:", err)
      throw new Error("Something went wrong!")
    }
  }
}

export { TenantsRepository }
