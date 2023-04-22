import { inject, injectable } from "tsyringe"

import { ITenantsRepository } from "@application/repositories"
import {
  IGetAllTenantsParamsDTO,
  IGetAllTenantsResponseDTO,
} from "@application/modules/tenant"

@injectable()
class GetAllTenantsUseCase {
  constructor(
    @inject("TenantsRepository") private tenantsRepository: ITenantsRepository
  ) {}

  async execute(
    params?: IGetAllTenantsParamsDTO
  ): Promise<IGetAllTenantsResponseDTO> {
    return await this.tenantsRepository.getAll({
      size: params?.size,
      startAt: params?.startAt,
    })
  }
}

export { GetAllTenantsUseCase }
