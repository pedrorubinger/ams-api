import { inject, injectable } from "tsyringe"

import { ITenantsRepository } from "@application/repositories"
import { IDeleteTenantResponseDTO } from "@application/modules/tenant"

@injectable()
class DeleteTenantUseCase {
  constructor(
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
  ) {}

  async execute(id: string): Promise<IDeleteTenantResponseDTO> {
    return await this.tenantsRepository.delete(id)
  }
}

export { DeleteTenantUseCase }
