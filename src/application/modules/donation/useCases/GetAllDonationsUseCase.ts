import { inject, injectable } from "tsyringe"

import { IDonationsRepository } from "@application/repositories"
import {
  IGetAllDonationsDTO,
  IGetAllDonationsResponseDTO,
} from "@application/modules/donation/dto"

@injectable()
export class GetAllDonationsUseCase {
  constructor(
    @inject("DonationsRepository")
    private donationsRepository: IDonationsRepository
  ) {}

  async execute({
    category,
    partnerId,
    tenantId,
  }: IGetAllDonationsDTO): Promise<IGetAllDonationsResponseDTO> {
    return await this.donationsRepository.getAll({
      category,
      partnerId,
      tenantId,
    })
  }
}
