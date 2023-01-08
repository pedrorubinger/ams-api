import { inject, injectable } from "tsyringe"

import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import { ICreateTenantDTO } from "@application/modules/tenant/dto/ICreateTenantDTO"
import { Tenant, ITenant } from "@domain/entities/Tenant"

@injectable()
class CreateTenantUseCase {
  constructor(
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
  ) {}

  async execute({ name, responsible }: ICreateTenantDTO): Promise<ITenant> {
    const tenant = Tenant.create({ name, responsible })
    const payload = { ...tenant.props, id: tenant.id }

    return await this.tenantsRepository.create(payload)
  }
}

export { CreateTenantUseCase }
