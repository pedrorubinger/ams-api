import { ICreateTenantDTO } from "@application/modules/tenant/dto/ICreateTenantDTO"
import { ITenant } from "@domain/entities/Tenant"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<ITenant>
}

export { ITenantsRepository }
