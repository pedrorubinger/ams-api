import { inject, injectable } from "tsyringe"

import { Tenant } from "@domain/entities"
import { ITenantsRepository } from "@application/repositories"
import {
  ICreateTenantDTO,
  ICreateTenantResponseDTO,
} from "@application/modules/tenant"

@injectable()
class CreateTenantUseCase {
  constructor(
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
  ) {}

  async execute({
    name,
    responsible,
  }: ICreateTenantDTO): Promise<ICreateTenantResponseDTO> {
    const tenant = Tenant.create({ name, responsible })
    const payload = { ...tenant.props, id: tenant.id }

    return await this.tenantsRepository.create(payload)
  }
}

export { CreateTenantUseCase }
