import { inject, injectable } from "tsyringe"

import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import { ICreateTenantDTO } from "@application/modules/tenant/dto/ICreateTenantDTO"
import { Tenant } from "@domain/entities/Tenant"

@injectable()
class CreateTenantUseCase {
  constructor(
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
  ) {}

  async execute({ name, responsible }: ICreateTenantDTO): Promise<Tenant> {
    const tenant = Tenant.create({ name, responsible })
    const payload = { ...tenant.props, id: tenant.id }

    await this.tenantsRepository.create(payload)

    return tenant
  }
}

export { CreateTenantUseCase }
