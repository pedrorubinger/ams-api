import { inject, injectable } from "tsyringe"

import { IDonationsRepository } from "@application/repositories"
import { IGetAllDonationsResponseDTO } from "@application/modules/donation/dto"

@injectable()
export class GetDatabaseMetadataUseCase {
  constructor(
    @inject("DonationsRepository")
    private donationsRepository: IDonationsRepository
  ) {}

  async execute(): Promise<IGetAllDonationsResponseDTO> {
    return await this.donationsRepository.getAll()
  }
}
