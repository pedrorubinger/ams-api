import { ICreateTenantDTO } from "@application/modules/tenant/dto/ICreateTenantDTO"

interface ITenantsRepository {
  create(payload: ICreateTenantDTO): Promise<void>
}

export { ITenantsRepository }
