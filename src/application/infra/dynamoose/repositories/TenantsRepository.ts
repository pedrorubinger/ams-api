import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import { ICreateTenantDTO } from "@application/modules/tenant/dto/ICreateTenantDTO"
import { TenantModel } from "@domain/infra/dynamoose"

class TenantsRepository implements ITenantsRepository {
  async create(payload: ICreateTenantDTO): Promise<void> {
    try {
      const tenant = await TenantModel.create(payload)

      await tenant.save()
    } catch (err) {
      console.log("[ERROR] TenantsRepository > create:", err)
      throw new Error("Something went wrong!")
    }
  }
}

export { TenantsRepository }
