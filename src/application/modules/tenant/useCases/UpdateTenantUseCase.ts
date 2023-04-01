import { inject, injectable } from "tsyringe"

import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import {
  IUpdateTenantDTO,
  IUpdateTenantResponseDTO,
} from "@application/modules/tenant/dto/IUpdateTenantDTO"

@injectable()
class UpdateTenantUseCase {
  constructor(
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
  ) {}

  async execute({
    id,
    name,
    responsible,
  }: IUpdateTenantDTO): Promise<IUpdateTenantResponseDTO> {
    return await this.tenantsRepository.update({ id, name, responsible })
  }
}

export { UpdateTenantUseCase }
