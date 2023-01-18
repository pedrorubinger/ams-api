import { inject, injectable } from "tsyringe"

import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import { IGetAllTenantsResponseDTO } from "@application/modules/tenant/dto/IGetAllTenantsResponseDTO"

@injectable()
class GetAllTenantsUseCase {
  constructor(
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
  ) {}

  async execute(): Promise<IGetAllTenantsResponseDTO> {
    return await this.tenantsRepository.getAll()
  }
}

export { GetAllTenantsUseCase }
